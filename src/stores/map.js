import * as constants from 'app/constants';
import Fluxxor from 'fluxxor';

(function(){
  if (typeof Object.defineProperty === 'function'){
    try{Object.defineProperty(Array.prototype,'sortBy',{value:sb}); }catch(e){}
  }
  if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;

  function sb(f){
    for (var i=this.length;i;){
      var o = this[--i];
      this[i] = [].concat(f.call(o,o,i),o);
    }
    this.sort(function(a,b){
      for (var i=0,len=a.length;i<len;++i){
        if (a[i]!=b[i]) return a[i]<b[i]?-1:1;
      }
      return 0;
    });
    for (var i=this.length;i;){
      this[--i]=this[i][this[i].length-1];
    }
    return this;
  }
})();

let map = Fluxxor.createStore({
    initialize: function () {
        this.state = {};
        this.bindActions(
                constants.LOAD_PATH_LOADED, this.setLoadPoints
            );
    },

    setLoadPoints: function (points){
        
        var sortedPoints = points.sortBy(function(o){
            return o.time;
        });

         this.setProps({ 'points': sortedPoints});
    },

    setProps(obj) {
        this.state = { ...this.state, ...obj };
        this.changed();
    },

    changed() {
        this.emit('change');
    },

    getState: function () {
        return this.state;
    },


});


export default map;