class StickyNavigation {
  constructor() {
      this.currentId = null;
      this.currentTab = null;
      this.tabContainerHeight = 70;
      this.bindEvents();
      this.checkTabContainerPosition();
      this.findCurrentTabSelector();
  }

  bindEvents() {
      let self = this;
      $(window).scroll(() => { this.onScroll(); });
      $(window).resize(() => { this.onResize(); });

      $('a').on('click', function(event) {
          if (this.hash !== "") {
              event.preventDefault();
              let hash = this.hash;

              $('html, body').animate({
                  scrollTop: $(hash).offset().top - self.tabContainerHeight + 1
              }, 800, function() {
                  window.location.hash = hash;
              });
          }
      });
  }

  onScroll() {
      this.checkTabContainerPosition();
      this.findCurrentTabSelector();
  }

  onResize() {
      if (this.currentId) {
          this.setSliderCss();
      }
  }

  checkTabContainerPosition() {
      let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
      if ($(window).scrollTop() > offset) {
          $('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
      } else {
          $('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
      }
  }

  findCurrentTabSelector() {
      let newCurrentId;
      let newCurrentTab;
      let self = this;
      $('.et-hero-tab').each(function() {
          let id = $(this).attr('href');
          let offsetTop = $(id).offset().top - self.tabContainerHeight;
          let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
          if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
              newCurrentId = id;
              newCurrentTab = $(this);
          }
      });
      if (this.currentId != newCurrentId || this.currentId === null) {
          this.currentId = newCurrentId;
          this.currentTab = newCurrentTab;
          this.setSliderCss();
      }
  }

  setSliderCss() {
      let width = 0;
      let left = 0;
      if (this.currentTab) {
          width = this.currentTab.css('width');
          left = this.currentTab.offset().left;
      }
      $('.et-hero-tab-slider').css('width', width);
      $('.et-hero-tab-slider').css('left', left);
  }
}

$(document).ready(function() {
  new StickyNavigation();
});