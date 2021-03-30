<script>
  export let subtitle;
</script>

<div class="header">
  <h4
    style="font-weight: 600; margin: 0px; font-size: 16px; visibility:{subtitle !=
    undefined
      ? 'visible'
      : 'hidden'}"
  >
    {subtitle}
  </h4>
  <h1><slot /></h1>
</div>

<style>
  .header {
    /* height: 3rem; */
    background-color: #ff3e00;
    border: 1px solid rgba(0, 0, 0, 0.125);

    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1ch;
    padding-left: 1.25ch;
    border-top-right-radius: 0.25rem;
    border-bottom-left-radius: 7.5px;
    border-bottom-right-radius: 7.5px;
  }
  h1 {
    color: #fff;
    margin: 0;
    font-weight: 500;
  }
  h4 {
    color: #fff;
    padding: 20px;
    margin: 0px;
    padding: 0px;
  }
</style>
