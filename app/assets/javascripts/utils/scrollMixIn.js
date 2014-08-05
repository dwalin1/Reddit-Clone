window.scrollMixIn = {
    listenForScroll: function () {
      $(window).off("scroll");
      var throttledCallback = _.throttle(this.nextPage.bind(this), 200);
      $(window).on("scroll", throttledCallback);
    },

    nextPage: function () {
      var self = this;
      if ($(window).scrollTop() > $(document).height() - $(window).height() - 50) {
        if (self.collection.page < self.collection.total_pages) {
          self.collection.fetch({
            data: { page: self.collection.page + 1 },
            remove: false,
            wait: true,
            success: function () {
            }
          });
        }
      }
    }	
};