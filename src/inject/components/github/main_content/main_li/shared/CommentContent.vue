<template>
  <div disabled="" sortable="">
    <table class="d-block">
      <tbody class="d-block">
        <tr class="d-block">
          <td class="d-block comment-body markdown-body  js-comment-body">
            <span class="githubStockedCommentsMainContent" v-html="markedBody()"></span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import markdown from '@/inject/lib/markdown'

export default {
  name: 'CommentContent',
  props: {
    body: {
      type: String,
      default: ''
    }
  },
  methods: {
    markedBody () {
      return markdown(this.body)
    }
  }
}
</script>