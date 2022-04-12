<template id="combobox-template">
  <div class="o-combobox">
    <input
      class="o-combobox__input"
      type="search"
      v-bind:placeholder="placeholder"
      v-model="startitem"
      v-on:click="showAutocompleteDropdown = true"
      v-on:keyup.enter.prevent="select(selectedIndex)"
      v-on:keydown.down.prevent="selectNext()"
      v-on:keydown.up.prevent="selectPrev()"
      v-on:keyup.8="handleBackspace()"
    />
    <ul class="o-date-list" v-if="showAutocompleteDropdown">
      <li
        class="o-date-list__item"
        v-for="item in filteredItems"
        v-on:click="select($index)"
        :key="item.id"
      >
        {{ item.Name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ComboboxComponent",
  data: function () {
    return {
      placeholder: "",
      showAutocompleteDropdown: false,
      selectedIndex: 0,
      startitem: "",
    };
  },
  props: {
    items: Object,
  },
  computed: {
    filteredItems: function () {
      if (this.startitem) {
        return this.items.filter((item) => {
          return (
            item.Name.toLowerCase().indexOf(this.startitem.toLowerCase()) > -1
          );
        });
      } else {
        return this.items;
      }
    },
  },
  methods: {
    handleBackspace: function () {
      this.showAutocompleteDropdown = true;
    },
    select: function (index) {
      this.showAutocompleteDropdown = false;
      this.startitem = this.filteredItems[index];
    },
    selectNext: function () {
      if (this.showAutocompleteDropdown) {
        if (this.selectedIndex < this.filteredItems.length - 1) {
          this.selectedIndex++;
        } else {
          this.selectedIndex = 0;
        }
      } else {
        this.showAutocompleteDropdown = true;
      }
    },
    selectPrev: function () {
      if (this.selectedIndex > 0) {
        this.selectedIndex--;
      } else {
        this.selectedIndex = this.filteredItems.length - 1;
      }
    },
  },
});
</script>