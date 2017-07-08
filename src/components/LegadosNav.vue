<template>
    <b-navbar v-b-scrollspy:legadosviews="50" type="inverse" variant="inverse" fixed="bottom">
        <div class="row" id="bottomNav">
            <b-nav fill>
                <b-nav-item href="#corevalues" @click.stop="scrollIntoView($event)">Core Values</b-nav-item>
                <b-nav-item href="#okrs" @click.stop="scrollIntoView($event)">OKRs</b-nav-item>
                <b-nav-item href="#focuson" @click.stop="scrollIntoView($event)">Focus On</b-nav-item>
            </b-nav>
        </div>
    </b-navbar>   
</template>

<script>
export default {
    methods: {
        // Convenience method to scroll an element that is offscreen into view
        // Not required for ScrollSpy to work
        scrollIntoView($event) {
            const href = $event.target.getAttribute('href');
            if (href) {
                const el = document.querySelector(href);
                if (el) {
                    el.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        }
    }
}
</script>