<template>
  <details class="details-reset details-overlay select-menu position-relative">
    <summary class="btn select-menu-button" aria-haspopup="menu">
      <i>Sort:</i>
      <span data-menu-button="">Recently comments </span>
    </summary>
    <div class="select-menu-modal position-absolute right-0" style="z-index: 99" role="menu">
      <div class="select-menu-header">
        <span class="select-menu-title">Sort options</span>
      </div>
      <div class="select-menu-list">
        <a role="menuitem" aria-checked="true" class="select-menu-item selected" href="https://github.com/stars?direction=desc&amp;sort=created" data-pjax="">
          <svg class="octicon octicon-check select-menu-item-icon" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true">
            <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
          </svg>
          <span class="select-menu-item-text" data-menu-button-text="">Recently comments</span>
        </a>
        <a role="menuitem" aria-checked="false" class="select-menu-item " href="https://github.com/stars?direction=desc&amp;sort=updated" data-pjax="">
          <svg class="octicon octicon-check select-menu-item-icon" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true">
            <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
          </svg>
          <span class="select-menu-item-text" data-menu-button-text="">Recently active</span>
        </a>
        <a role="menuitem" aria-checked="false" class="select-menu-item " href="https://github.com/stars?direction=desc&amp;sort=stars" data-pjax="">
          <svg class="octicon octicon-check select-menu-item-icon" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true">
            <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
          </svg>
          <span class="select-menu-item-text" data-menu-button-text="">Most stars</span>
        </a>
      </div>
    </div>
  </details>
</template>

<script>
export default {
  name: 'SelectDetailsMenu'
}
</script>