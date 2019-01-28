<template>
  <span>
    <h3 class="h4 mb-2">Filter by languages</h3>
    <ul class="filter-list small" data-pjax="">
      <li class="language">
        <span class="bar" style="width: 28%;"></span>
        <a class="filter-item" href="https://github.com/stars?language=javascript">
          <span class="count">14 </span>JavaScript
        </a>
      </li>
      <li class="language">
        <span class="bar" style="width: 28%;"></span>
        <a class="filter-item" href="https://github.com/stars?language=ruby">
          <span class="count">14 </span>Ruby
        </a>
      </li>
      <li class="language">
        <span class="bar" style="width: 2px;"></span>
        <a class="filter-item" href="https://github.com/stars?language=c%2B%2B">
          <span class="count">1 </span>C++
        </a>
      </li>
      <li class="language">
        <span class="bar" style="width: 8%;"></span>
        <a class="filter-item" href="https://github.com/stars?language=python">
          <span class="count">4 </span>Python
        </a>
      </li>
      <li class="language">
        <span class="bar" style="width: 12%;"></span>
        <a class="filter-item" href="https://github.com/stars?language=go">
          <span class="count">6 </span>Go
        </a>
      </li>
      <li class="language">
        <span class="bar" style="width: 6%;"></span>
        <a class="filter-item" href="https://github.com/stars?language=typescript">
          <span class="count">3 </span>TypeScript
        </a>
      </li>
      <li class="language">
        <span class="bar" style="width: 2px;"></span>
        <a class="filter-item" href="https://github.com/stars?language=css">
          <span class="count">1 </span>CSS
        </a>
      </li>
      <li class="language">
        <span class="bar" style="width: 4%;"></span>
        <a class="filter-item" href="https://github.com/stars?language=html">
          <span class="count">2 </span>HTML
        </a>
      </li>
      <li class="language">
        <span class="bar" style="width: 4%;"></span>
        <a class="filter-item" href="https://github.com/stars?language=vue">
          <span class="count">2 </span>Vue
        </a>
      </li>
    </ul>
  </span>
</template>

<script>
export default {
  name: 'FilterListByLanguages'
}
</script>