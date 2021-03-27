<template>
  <iframe :src="'https://calendar.google.com/calendar/embed?src=' + encodeURIComponent(calendar_id) +
              '&amp;ctz=' + Intl.DateTimeFormat().resolvedOptions().timeZone" width="100%" height="600" frameborder="0"></iframe>
</template>

<script>
export default {
  name: "calendar",
  props: {
    calendar_id: {
      required: true
    }
  }
}
</script>

<style scoped>

</style>