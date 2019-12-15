<template>
  <div class="file-uploader">
    <input
      id="my-upload"
      @change="addFile"
      :multiple="multiple"
      :name="name"
      type="file"
    >
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'FileUploader',
  props: {
    name: String,
    action: {
      type: String,
      required: true
    },
    autoUpload: {
     type: Boolean,
      default: true
    },
    fileList: {
      type: Array,
      default () {
        return []
      }
    },
    data: Object,
    multiple: Boolean,
    limit: Number,
    onChange: Function,
    onBefore: Function,
    onProgress: Function,
    onSuccess: Function,
    onFailed: Function,
    onFinished: Function
  },
  methods: {
    addFile ({ target: { files } }) { // input标签触发onchange事件时，将文件加入待上传列表
      for (let i = 0, l = files.length; i < l; i++) {
        files[i].url = URL.createObjectURL(files[i])// 创建blob地址，不然图片怎么展示？
        files[i].status = 'ready'// 开始想给文件一个字段表示上传进行的步骤的，后面好像也没去用......
      }
      let fileList = [...this.fileList]
      if (this.multiple) { // 多选时，文件全部压如列表末尾
        fileList = [...fileList, ...files]
        const l = fileList.length
        let limit = this.limit
        if (limit && typeof limit === 'number' && Math.ceil(limit) > 0 && l > limit) { // 有数目限制时，取后面limit个文件
          limit = Math.ceil(limit)
          fileList = fileList.slice(l - limit)
        }
      } else { // 单选时，只取最后一个文件。注意这里没写成fileList = files;是因为files本身就有多个元素（比如选择文件时一下子框了一堆）时，也只要一个
        fileList = [files[0]]
      }
      this.onChange(fileList)// 调用父组件方法，将列表缓存到上一级data中的fileList属性
    },

    remove (index) {
      const fileList = [...this.fileList]
      if (fileList.length) {
        fileList.splice(index, 1)
        this.onChange(fileList)
      }
    },

    submit () {
      if (this.checkIfCanUpload()) {
        if (this.onProgress && typeof XMLHttpRequest !== 'undefined') { this.xhrSubmit() }
      }
    },

    xhrSubmit () {
      const _this = this
      const options = this.fileList.map((rawFile, index) => ({
        file: rawFile,
        data: _this.data,
        filename: _this.name || 'file',
        action: _this.action,
        onProgress (e) {
          _this.onProgress(index, e)// 闭包，将index存住
        },
        onSuccess (res) {
          _this.onSuccess(index, res)
        },
        onError (err) {
          _this.onFailed(index, err)
        },
        onFinished(res){ //👉👉👉👉这里补充一个配置
          _this.onFinished(res); //👉👉👉👉
        }
      }))
      const l = this.fileList.length
      const send = async (options) => {
        for (let i = 0; i < l; i++) {
          await _this.sendRequest(options[i], l);//👉👉👉将文件数传到下文
        }
      }
      send(options)
    },
    sendRequest (option, total) {
      const _this = this
      upload(option)

      function getError (action, option, xhr) {
        let msg = void 0
        if (xhr.response) {
          msg = xhr.status + ' ' + (xhr.response.error || xhr.response)
        } else if (xhr.responseText) {
          msg = xhr.status + ' ' + xhr.responseText
        } else {
          msg = 'fail to post ' + action + ' ' + xhr.status
        }

        const err = new Error(msg)
        err.status = xhr.status
        err.method = 'post'
        err.url = action
        return err
      }

      function getBody (xhr) {
        const text = xhr.responseText || xhr.response
        if (!text) {
          return text
        }

        try {
          return JSON.parse(text)
        } catch (e) {
          return text
        }
      }

      function upload (option) {
        if (typeof XMLHttpRequest === 'undefined') {
          return
        }

        const xhr = new XMLHttpRequest()
        const action = option.action

        if (xhr.upload) {
          xhr.upload.onprogress = function progress (e) {
            if (e.total > 0) {
              e.percent = e.loaded / e.total * 100
            }
            option.onProgress(e)
          }
        }

        const formData = new FormData()

        if (option.data) {
          Object.keys(option.data).map(function (key) {
            formData.append(key, option.data[key])
          })
        }

        formData.append(option.filename, option.file)

        xhr.onerror = function error (e) {
          option.onError(e)
        }

        xhr.onload = function onload () {
          _this.success = _this.success || 0;//👈👈👈👈
          _this.failed = _this.failed || 0;//👈👈👈👈
          const onFinished = () => {//👈👈👈👈
            if(_this.failed + _this.success === total){//判断是否全部上传👈👈👈👈
              option.onFinished({success: _this.success, failed: _this.failed});
            }//👈👈👈👈
          }//👈👈👈👈
          if (xhr.status < 200 || xhr.status >= 300) {
            _this.failed++;//更新失败文件数👈👈👈👈
            option.onError(getError(action, option, xhr));
          }else{       _this.success++;//更新成功文件数👈👈👈👈
            option.onSuccess(getBody(xhr));
          }
          onFinished();//每次上传都要检测调用完成方法👈👈👈👈
        };

        xhr.open('post', action, true)

        if (option.withCredentials && 'withCredentials' in xhr) {
          xhr.withCredentials = true
        }

        const headers = option.headers || {}

        for (const item in headers) {
          if (headers.hasOwnProperty(item) && headers[item] !== null) {
            xhr.setRequestHeader(item, headers[item])
          }
        }
        xhr.send(formData)
        return xhr
      }
    },
    checkIfCanUpload () {
      return this.fileList.length > 0
    }

  }// 下文主要是methods的介绍，此处先省略
}
</script>

<style lang="scss" scoped>
.file-uploader {
 position: relative;
  display: inline-block;
  #my-upload {
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
}
</style>
