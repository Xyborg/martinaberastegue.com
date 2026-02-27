(function () {
  'use strict';

  // ---- Theme ----
  function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    var isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
  }

  function updateThemeIcon() {
    var isDark = document.documentElement.classList.contains('dark');
    var icons = document.querySelectorAll('.footer__theme-toggle i');
    icons.forEach(function (icon) {
      icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    });
  }

  var savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  }
  updateThemeIcon();

  window.toggleTheme = toggleTheme;

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
      'chart-bar': ['fa-chart-bar']
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

          project.style.display = matchesFilter ? '' : 'none';
        });
      });
    });
  });
})();
