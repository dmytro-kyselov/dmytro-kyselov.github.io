'use strict';

function themeSwitching () {
  const toggle = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const label = document.getElementById('themeLabel');
  const html = document.documentElement;

  // States: 'auto', 'light', 'dark'
  const getCurrentState = () => {
    if (html.classList.contains('dark')) return 'dark';
    if (html.classList.contains('light')) return 'light';
    return 'auto';
  };

  const setState = (state) => {
    // Remove both classes
    html.classList.remove('light', 'dark');

    if (state === 'dark') {
      html.classList.add('dark');
      icon.textContent = '🌙';
      label.textContent = 'Dark';
    } else if (state === 'light') {
      html.classList.add('light');
      icon.textContent = '☀️';
      label.textContent = 'Light';
    } else {
      // auto
      icon.textContent = '🌓';
      label.textContent = 'Auto';
    }
    // Save preference
    localStorage.setItem('sqplugins-theme', state);
  };

  const cycleState = () => {
    const current = getCurrentState();
    if (current === 'auto') setState('light');
    else if (current === 'light') setState('dark');
    else setState('auto');
  };

  // Load saved preference
  const saved = localStorage.getItem('sqplugins-theme');
  if (saved) {
    setState(saved);
  } else {
    // default: auto (which is just no class)
    setState('auto');
  }

  toggle.addEventListener('click', cycleState);

  // Also update toggle when system changes (if in auto mode)
  // We can listen for change event on matchMedia
  const darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)');
  darkModeMedia.addEventListener('change', () => {
    // Only if current state is 'auto' should we reapply
    if (getCurrentState() === 'auto') {
      // Remove classes to let system take over
      html.classList.remove('light', 'dark');
      // But our setState('auto') will also remove classes and set icon/label
      setState('auto');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  themeSwitching();
});
