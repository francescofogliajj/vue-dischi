// Attraverso una chiamata ajax all’API di boolean
// https://flynn.boolean.careers/exercises/api/array/music
// avremo a disposizione una decina di dischi musicali.
// Utilizzando vue, stampiamo a schermo una card per ogni album.
// BONUS: Creare una select con tutti i generi dei dischi. In base a
// cosa scegliamo nella select, vedremo i corrispondenti cd.
// BONUS 2: Ordinare i dischi per anno di uscita.

var app = new Vue({

  el: "#app",

  data: {
    discs: [],
    selected: "",
    genres: []
  },

  methods: {

    filterDiscs: function() {
      return this.discs.filter( (disc) => {

        if (this.selected == disc.genre) {
          return disc;
        } else if (this.selected == "") {
          return this.discs;
        }

      });
    }

  },

  mounted: function() {

    axios
      .get("https://flynn.boolean.careers/exercises/api/array/music")
      .then( result => {
        this.discs = result.data.response;

        this.discs.forEach( (disc) => {
          if (!this.genres.includes(disc.genre)) {
            this.genres.push(disc.genre);
          }
        });

        this.discs.sort( (disc1, disc2) => {
          return parseInt(disc1.year) - parseInt(disc2.year);
        });

    });

  }

});
