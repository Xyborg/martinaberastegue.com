(function () {
  'use strict';

  // ---- Navbar scroll shadow ----
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }
    }, { passive: true });
  }

  // ---- Fade-in on scroll ----
  var fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    fadeElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // ---- Project filtering ----
  document.addEventListener('DOMContentLoaded', function () {
    var filters = document.querySelectorAll('.filters__btn');
    var projects = document.querySelectorAll('.project-card');

    if (!filters.length) return;

    var iconMap = {
      'plane': ['fa-plane', 'fa-plane-departure', 'fa-globe'],
      'shield-alt': ['fa-shield-alt', 'fa-lock'],
      'dog': ['fa-dog'],
      'link': ['fa-link'],
      'child': ['fa-child'],
      'chart-bar': ['fa-chart-bar'],
      'code': ['fa-code']
    };

    filters.forEach(function (filter) {
      filter.addEventListener('click', function () {
        filters.forEach(function (f) { f.classList.remove('filters__btn--active'); });
        this.classList.add('filters__btn--active');

        var filterValue = this.getAttribute('data-filter');

        projects.forEach(function (project) {
          if (filterValue === 'all') {
            project.style.display = '';
            return;
          }

          var badge = project.querySelector('.project-badge i');
          var iconVariations = iconMap[filterValue] || [];
          var matchesFilter = iconVariations.some(function (icon) {
            return badge && badge.classList.contains(icon);
          });

          if (matchesFilter) {
            project.style.display = '';
            project.classList.add('is-visible');
          } else {
            project.style.display = 'none';
          }
        });
      });
    });
  });
})();
