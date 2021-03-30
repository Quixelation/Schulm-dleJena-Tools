<script>
</script>

<button>
  <slot />
</button>

<style>
  button {
    background-color: #ff3e00;
    color: white;
    font-weight: 500;
    padding: 8px 24px;
    border-radius: 4px;
    line-height: 20px;
    font-size: 14px;
    transition: background-color 0.1s ease, transform 0.1s ease;
    cursor: pointer;
  }
  button:active {
    background-color: #d83702;
    transform: translateY(1px);
  }
</style>
