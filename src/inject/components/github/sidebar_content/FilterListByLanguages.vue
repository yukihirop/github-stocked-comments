<template>
  <span>
    <h3 class="h4 mb-2">Filter by languages</h3>
    <ul class="filter-list small">
      <span v-for="(count, language) in languageList">
        <li class="language">
          <span class="bar"></span>
          <a :class="['filter-item', clickClass(language)]" :value="language" @click="clickLanguageTag($event)">
            <span class="count">{{ count }}</span>{{ language }}
            <span v-if="displayDeleteButton(language)">
              <span @click.stop="clickDeleteButton($event)" :value="language">
                <!-- from github -->
                <svg class="octicon octicon-x" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path>
                </svg>
              </span>
            </span>
          </a>
        </li>
      </span>
    </ul>
  </span>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'FilterListByLanguages',
  data(){
    return {
      clickClassData: {}
    }
  },
  computed: {
    ...mapState('sidebar',[
      'languageList'
    ])
  },
  methods: {
    ...mapActions('sidebar',[
      'getTiedLanguageTagCommentData',
      'getAllFilteredCommentData'
    ]),
    clickLanguageTag(event){
      let language = event.currentTarget.getAttribute('value')
      this.getTiedLanguageTagCommentData(language)
      this._resetClickClass()
      this.$set(this.clickClassData, language, 'selected')
    },
    clickDeleteButton(event){
      let language = event.currentTarget.getAttribute('value')
      this.getAllFilteredCommentData()
      this.$set(this.clickClassData, language, '')
    },
    clickClass(language){
      return this.clickClassData[language]
    },
    displayDeleteButton(language) {
      return this.clickClassData[language] === 'selected'
    },
    _resetClickClass(){
      this.clickClassData = Object.keys(this.clickClassData).reduce((base, language) => {
        base[language] = ''
        return base
      }, {})
    }
  }
}
</script>