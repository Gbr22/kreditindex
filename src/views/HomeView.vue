<script setup lang="ts">
import FilePicker from '@/components/FilePicker.vue';
import Semesters from '@/components/Semesters.vue';
import Subjects from '@/components/Subjects.vue';
import Results from '@/components/Results.vue';
</script>

<template>
	<div class="page">
		<header>
			<h1>Kreditindex és átlag kalkulátor</h1>
			<div class="picker"><FilePicker /></div>
		</header>
		<section class="semesters">
			<Semesters />
		</section>
		<section class="subjects">
			<h2>Tárgyak</h2>
			<Subjects />
		</section>
		<section>
			<h2>Statisztika</h2>
			<Results />
		</section>
	</div>
</template>

<style scoped lang="scss">
.page {
    --section-padding: 20px;
    padding: 10vh 15vw;
    display: flex;
    flex-direction: column;
    gap: 20px;

    h1, h2 {
        font-size: min(calc(6vw), 28px);
    }

    header {
        display: flex;
        flex-direction: row;
        gap: 20px;

        h1 {
            flex: 1;
        }

        .picker {
            display: grid;
            place-content: center;
        }
    }
    header, section {
        border-radius: calc(var(--section-padding) / 2);
        padding: var(--section-padding);
        background-color: #fff;
        box-shadow: 0 8px 12px rgba($color: #000000, $alpha: 0.08);
    }

    section {
        h2 {
            margin-bottom: calc(var(--section-padding) / 2);
        }
    }
    .semesters {
        overflow-x: auto;
        overflow-y: hidden;
        padding: var(--section-padding) 0;

        & > :first-child {
            padding-left: var(--section-padding);
            padding-right: var(--section-padding);
        }
    }
}

@media screen and (max-width: 850px){
    .page {
        --section-padding: 20px;
        padding: 20px;
    }
}

@media screen and (max-width: 650px){
    .page {
        section {
            h2 {
                text-align: center;
            }
        }
        .subjects {
            padding-top: 10px;
            padding-bottom: 10px;
            h2 {
                display: none;
            }
        }
    }
}
</style>