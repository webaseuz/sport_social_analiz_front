<template>
  <p class="clearfix mb-0">
    <span class="float-md-left d-block d-md-inline-block mt-25">
      {{ $t('prm') }} <br>
      {{ $t('contact') }} <b> +99871 000 00 00 {{ $t('InNumber') }} </b>
      <!-- <b-link
        class="ml-25"
        href="https://1.envato.market/pixinvent_portfolio"
        target="_blank"
      >Pixinvent</b-link>
      <span class="d-none d-sm-inline-block">, All rights Reserved</span> -->
    </span>

    <span class="float-md-right d-none d-md-block">version 1.0.0 - {{ new Date().getFullYear() }} <br />
    <!-- <span> Supported by <a target="_blank" href="daac.uz"> daac.uz </a> </span> -->
      <!-- <feather-icon
        icon="HeartIcon"
        size="21"
        class="text-danger stroke-current"
      /> -->
    </span>
  </p>
</template>

<script>
import { BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
  },
}
</script>
