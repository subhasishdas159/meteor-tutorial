<script>
  import { Meteor } from 'meteor/meteor'
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { Heroes } from '../api/heroes.js'
  import { BlazeTemplate }   from 'meteor/svelte:blaze-integration'
  import { onMount } from 'svelte'
  import Hero from './Hero.svelte'
  import { selectedHero } from '../api/store.js'

  let newHero = ""
  let currentUser
  let heroes

  onMount(async () => {
    await Meteor.subscribe('publishedHeroes')
  })

    $:{
      currentUser = useTracker(() => Meteor.user())
      if($currentUser) {
        heroes = useTracker(() => Heroes.find({ username: $currentUser.username }, { sort: { createdAt: -1 } }).fetch());
      }
    }

    $: {
        if($currentUser) {
        console.log($currentUser.username)
        heroes = useTracker(() => Heroes.find({}, { sort: { createdAt: -1 } }).fetch());
      }
    }
    

    const handleSubmit = (event) => {
      Meteor.call('heroes.insert', newHero)
      newHero = ""
    }

  function addPoint() {
    Meteor.call('heroes.addPoints', $selectedHero)
  }      
</script>
 
 
<div class="container">
  <header>
    <h1>Todo List</h1>
    <br>

    <BlazeTemplate template="loginButtons" />

    {#if $currentUser}

      <form on:submit|preventDefault={handleSubmit}>
        <input type="text" placeholder="Type to add a new hero" bind:value="{newHero}" />
      </form>
      
      {#if $currentUser} 
        <button on:click={addPoint}>Give 5 Points</button>
      {/if}

    {/if}

  </header>
  <ul>
  {#if $currentUser} 
    {#each $heroes as hero (hero._id)}
      <Hero
        key={hero._id}
        hero={hero}
      />
    {/each}
  {/if}
  </ul>
</div>