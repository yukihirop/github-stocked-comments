<template>
  <div disabled="" sortable="">
    <table class="d-block">
      <tbody class="d-block">
        <tr class="d-block">
          <td class="d-block comment-body markdown-body  js-comment-body">
            <p>
              <a class="user-mention" href="https://github.com/posva">
                <span class="ghh-user-x tooltipstered" style="box-shadow: transparent 0px 0px;">@posva</span>
              </a>no worries, feel free to completely disregard this PR. I have one question though, 
              <code>test-cover</code>is working local but failing on
              <code>circleci</code>, is that something I should expect to happen in this codebase?

              <!-- 例えばコードの表示の場合 -->
              <div class="highlight highlight-text-html-basic"><pre>&lt;<span class="pl-ent">template</span>&gt;
                 &lt;<span class="pl-ent">component-a</span> <span class="pl-e">props</span>=<span class="pl-s"><span class="pl-pds">"</span>{ title, show, other }<span class="pl-pds">"</span></span>&gt;&lt;/<span class="pl-ent">component-a</span>&gt;
                 <span class="pl-c"><span class="pl-c">&lt;!--</span> instead of <span class="pl-c">--&gt;</span></span>
                 &lt;<span class="pl-ent">component-a</span> <span class="pl-e">:title</span>=<span class="pl-s">title</span> <span class="pl-e">:show</span>=<span class="pl-s">show</span> <span class="pl-e">:other</span>=<span class="pl-s">other</span>&gt;&lt;/<span class="pl-ent">component-a</span>&gt;
              &lt;/<span class="pl-ent">template</span>&gt;</pre></div>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'CommentContent'
}
</script>