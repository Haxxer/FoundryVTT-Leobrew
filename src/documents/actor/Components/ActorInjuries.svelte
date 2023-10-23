<script>

  import { getContext } from "svelte";
  import ContextMenu from "../../../utils/context-menu.js";
  import { localize } from "#runtime/svelte/helper";

  const doc = getContext("DocumentStore");

  $: armorBonuses = $doc.armorBonuses;

  $: injuries = Object.entries($doc.system.injuries).map(([part, injury]) => {
    return {
      name: part,
      path: `Images/images/${part}${injury.value !== "" ? "_" + injury.value : ''}.webp`
    };
  })

	const injuryLocalization = {
    "": localize("LEOBREW.InjuriesNone"),
    "bruise": localize("LEOBREW.InjuriesBruise"),
    "one-light": localize("LEOBREW.InjuriesOneLight"),
    "two-light": localize("LEOBREW.InjuriesTwoLight"),
    "one-severe": localize("LEOBREW.InjuriesOneSevere"),
    "two-severe": localize("LEOBREW.InjuriesTwoSevere"),
    "critical": localize("LEOBREW.InjuriesCritical"),
	}

  let hoveredBodyPart = "";

  function contextMenu(event, selectedBodyPart) {

    const selectedInjury = $doc.system.injuries[selectedBodyPart].value;

    new ContextMenu({ selectedItem: selectedInjury })
      .setCallback(([bodyPart, injury]) => {
        return $doc.update({[`data.injuries.${bodyPart}.value`]: injury});
			})
			.setHeader(`Select injury (${selectedBodyPart}):`)
      .addMenuItem("No Injury", { id: "", data: [selectedBodyPart, ""] })
      .addMenuItem("Bruise", { id: "bruise", data: [selectedBodyPart, "bruise"] })
      .addMenuItem("One Light Injury", { id: "one-light", data: [selectedBodyPart, "one-light"] })
      .addMenuItem("Two Light Injury", { id: "two-light", data: [selectedBodyPart, "two-light"] })
      .addMenuItem("One Severe Injury", { id: "one-severe", data: [selectedBodyPart, "one-severe"] })
      .addMenuItem("Two Severe Injury", { id: "two-severe", data: [selectedBodyPart, "two-severe"] })
      .addMenuItem("Critical", { id: "critical", data: [selectedBodyPart, "critical"] })
      .show({ position: { x: event.pageX, y: event.pageY } })

  }


</script>

<div class="injuries">
	<div class="armor-table">
		<table>
			<thead>
			<tr>
				<th>Part</th>
				<th>Def</th>
			</tr>
			</thead>
			<tbody>
			{#each armorBonuses as bodyPart}
				<tr>
					<td>{ bodyPart.label }</td>
					<td>{ bodyPart.value }</td>
				</tr>
			{/each}
			</tbody>
		</table>
	</div>

	<div class="hitboxes">
		{#each injuries as injury }
			<img src="{injury.path}" class:active="{hoveredBodyPart === injury.name}"/>
		{/each}
		<svg style="z-index:5000;" viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
			<path d="M30,15 L65,15 L60,45 L47.5,35 L35,45 Z" data-bodypart="chest" fill="transparent"
						data-tooltip={injuryLocalization[$doc.system.injuries["chest"].value]}
						on:contextmenu={(evt) => { contextMenu(evt, "chest") }}
						on:mouseover={() => { hoveredBodyPart = "chest" }}
						on:mouseleave={() => { hoveredBodyPart = "" }}
						pointer-events="fill"
			></path>
		</svg>
		<svg style="z-index:5000;" viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
			<path d="M30,15 L0,45 L0,65 L35,45 Z" data-bodypart="arms" fill="transparent"
						data-tooltip={injuryLocalization[$doc.system.injuries["arms"].value]}
						on:contextmenu={(evt) => { contextMenu(evt, "arms") }}
						on:mouseover={() => { hoveredBodyPart = "arms" }}
						on:mouseleave={() => { hoveredBodyPart = "" }}
						pointer-events="fill"
			></path>
		</svg>
		<svg style="z-index:5000;" viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
			<path d="M65,15 L97,45 L97,65 L60,45 Z" data-bodypart="arms" fill="transparent"
						data-tooltip={injuryLocalization[$doc.system.injuries["arms"].value]}
						on:contextmenu={(evt) => { contextMenu(evt, "arms") }}
						on:mouseover={() => { hoveredBodyPart = "arms" }}
						on:mouseleave={() => { hoveredBodyPart = "" }}
						pointer-events="fill"
			></path>
		</svg>
		<svg style="z-index:5000;" viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
			<path d="M35,15 L35,0 L60,0 L60,15 Z" data-bodypart="head" fill="transparent"
						data-tooltip={injuryLocalization[$doc.system.injuries["head"].value]}
						on:contextmenu={(evt) => { contextMenu(evt, "head") }}
						on:mouseover={() => { hoveredBodyPart = "head" }}
						on:mouseleave={() => { hoveredBodyPart = "" }}
						pointer-events="fill"
			></path>
		</svg>
		<svg style="z-index:5000;" viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
			<path d="M60,45 L65,60 L47.5,70 L30,60 L35,45 L47.5,35 Z" data-bodypart="guts" fill="transparent"
						data-tooltip={injuryLocalization[$doc.system.injuries["guts"].value]}
						on:contextmenu={(evt) => { contextMenu(evt, "guts") }}
						on:mouseover={() => { hoveredBodyPart = "guts" }}
						on:mouseleave={() => { hoveredBodyPart = "" }}
						pointer-events="fill"
			></path>
		</svg>
		<svg style="z-index:5000;" viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
			<path d="M65,60 L67,127 L55,127 L47.5,70 Z" data-bodypart="legs" fill="transparent"
						data-tooltip={injuryLocalization[$doc.system.injuries["legs"].value]}
						on:contextmenu={(evt) => { contextMenu(evt, "legs") }}
						on:mouseover={() => { hoveredBodyPart = "legs" }}
						on:mouseleave={() => { hoveredBodyPart = "" }}
						pointer-events="fill"
			></path>
		</svg>
		<svg style="z-index:5000;" viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
			<path d="M30,60 L27,127 L42,127  L47.5,70 Z" data-bodypart="legs" fill="transparent"
						data-tooltip={injuryLocalization[$doc.system.injuries["legs"].value]}
						on:contextmenu={(evt) => { contextMenu(evt, "legs") }}
						on:mouseover={() => { hoveredBodyPart = "legs" }}
						on:mouseleave={() => { hoveredBodyPart = "" }}
						pointer-events="fill"
			></path>
		</svg>
	</div>
</div>

<style lang="scss">

  .injuries {

    display: flex;
    padding-right: 5px;
    overflow: hidden;
    height: 100%;

    .armor-table {
      margin-top: 50px;
      flex: 0 1 auto;
      text-align: center;
      max-width: 50px;

      table {
        th {
          padding: 5px;
        }

        td {
          padding: 5px;
        }
      }
    }

    .hitboxes {
      width: 225px;
      height: 100%;
      top: 20px;
      left: 50px;
      position: relative;

      svg {
        position: absolute;
        object-fit: contain;
        pointer-events: none;
      }

      img {
        width: 213px;
        position: absolute;
        object-fit: contain;
        border: 0px;

        &.severe-injury {
          filter: url('#severe-injury');
        }

        &.active {
          filter: drop-shadow(0 0 0.75rem crimson);
        }

      }

      .head {
        z-index: 5;
      }

      .arms {
        z-index: 4;
      }

      .legs {
        z-index: 3;
      }

      .guts {
        z-index: 2;
      }

      .chest {
        z-index: 1;
      }
    }
  }

</style>
