<template>
  <span>
    <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="Box Box--overlay d-flex flex-column anim-fade-in fast" aria-label="Delete Comment Data">
              <div class="Box-header">
                <div class="Box-title">Are you absolutely sure?</div>
              </div>
              <div class="flash flash-warn flash-full">Unexpected bad things will happen if you don’t read this! </div>
              <div class="Box-body overflow-auto">
                <p>This action
                  <strong>cannot</strong> be undone. This will permanently delete this comment data.
                </p>
                <div class="modal-footer">
                  <button type="button" class="btn btn-block btn-danger" @click="clickOK">OK</button>
                  <button type="button" class="btn btn-block btn-info" @click="clickCancel">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
  </span>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'DeleteModal',
  computed: {
    ...mapState('main_ext', [
      'deleteModalParams'
    ])
  },
  methods: {
    ...mapActions('main_ext', [
      'deleteCommentDataById',
      'closeDeleteModal'
    ]),
    clickOK(){
      this.deleteCommentDataById(this.deleteModalParams)
      this.closeDeleteModal()
    },
    clickCancel(){
      this.closeDeleteModal()
    }
  }
}
</script>

<style scoped="true">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>