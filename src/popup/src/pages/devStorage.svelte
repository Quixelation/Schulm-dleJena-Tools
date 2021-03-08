<script lang="ts">
  let data = null;
  chrome.storage.sync.get(null, (val) => {
    data = val;
  });
</script>

<span style="white-space: pre">
  {JSON.stringify(data, null, 2)}
</span>
