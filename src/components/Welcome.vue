<template>
  <div class="container">
    <div class="welcome-page">
      <h1 data-heading="WELCOME">WELCOME</h1>
    </div>
  </div>
</template>

<style scoped>
.welcome-page {
  height: 100%;
  background: linear-gradient(
    to right,
    white 0%,
    white 50%,
    black 0%,
    black 50%
  );
}

h1 {
  color: white;
  white-space: nowrap;
  font-size: 5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

h1::before {
  content: attr(data-heading);
  position: absolute;
  left: 0;
  color: black;
  width: 50%;
  overflow: hidden;
}
</style>
