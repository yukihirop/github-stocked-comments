<template>
  <div disabled="" sortable="">
    <table class="d-block">
      <tbody class="d-block">
        <tr class="d-block">
          <td class="d-block comment-body markdown-body  js-comment-body">
            {{ body }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'CommentContent',
  props: {
    body: {
      type: String,
      default: ''
    }
  }
}
</script>