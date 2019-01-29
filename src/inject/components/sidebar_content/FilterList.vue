<template>
  <ul class="filter-list" data-pjax="">
    <li>
      <a href="https://github.com/stars?direction=desc&amp;sort=created" class="filter-item selected" rel="public, li.private">
        <span class="count">50</span>All comments
      </a>
    </li>
    <li>
      <a href="https://github.com/stars?direction=desc&amp;filter=yours&amp;sort=created" class="filter-item " rel="Yours">
        <span class="count">1</span>Your repositories
      </a>
    </li>
    <li>
      <a href="https://github.com/stars?direction=desc&amp;filter=others&amp;sort=created" class="filter-item " rel="others">
        <span class="count">49</span>Others’ repositories
      </a>
    </li>
    <li>
      <a href="https://github.com/stars?direction=desc&amp;filter=topics&amp;sort=created" class="filter-item " rel="others">
        <span class="count">0</span>Topics
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'FilterList'
}
</script>