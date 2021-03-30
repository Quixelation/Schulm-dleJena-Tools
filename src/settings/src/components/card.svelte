<script lang="ts">
  export let highlight: boolean;
  export let shadow:
    | "smallest"
    | "small"
    | "medium"
    | "large"
    | "sticky"
    | "hover";
</script>

<div
  class="card"
  class:smallestShadow={shadow === "smallest"}
  class:smallShadow={shadow === "small"}
  class:mediumShadow={shadow === "medium"}
  class:largeShadow={shadow === "large"}
  class:stickyShadow={shadow === "sticky"}
  class:hoverShadow={shadow === "hover"}
  class:highlightCard={highlight}
>
  <slot />
</div>

<style>
  .card {
    border-radius: 0.25rem;
    border: 1px solid rgba(0, 0, 0, 0.125);
    padding: 1rem;
    background-color: #ffffff;
    margin-bottom: 15px;
  }
  .card.highlightCard {
    border: 2.5px solid #ff3e0080;
  }
  .card.smallestShadow {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12);
  }
  .card.smallShadow {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
  }
  .card.mediumShadow {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
  .card.largeShadow {
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
  }
  .card.stickyShadow {
    box-shadow: 0 12px 10px -10px rgba(0, 0, 0, 0.12);
  }

  .card.hoverShadow {
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
  }
</style>
