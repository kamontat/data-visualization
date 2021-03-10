<script lang="ts">
  import type Firebase from "firebase/app";
  export let firebase: typeof Firebase;
  export let user: Firebase.User;

  let disabled: boolean = false;
  let price: number = -1;

  const getPrices = () => {
    return firebase.database().ref(`users/${user.uid}/prices`);
  };

  const getLatestPrice = () => {
    return firebase.database().ref(`users/${user.uid}/price`);
  };

  getLatestPrice()
    .get()
    .then(v => {
      if (v.val() === null) {
        return null;
      }

      return getPrices().child(v.val()).get();
    })
    .then(v => {
      if (v === null || v.val() === null) {
        return;
      }

      price = v.val().amount;
    });

  const submit = () => {
    disabled = true;
    const ref = getPrices();
    const newRef = ref.push();
    getLatestPrice()
      .set(newRef.key)
      .then(() => {
        return newRef.set({
          amount: price,
          timestamp: +new Date(),
        });
      })
      .then(() => {
        console.log("synced");
        disabled = false;
      });
  };
</script>

<div>
  <input type="number" bind:value={price} />
  <button type="button" on:click={submit} {disabled}>Submit</button>
</div>
