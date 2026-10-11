// Global App Initialization & Mobile Navbar Toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }

  // Highlight active menu item
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
});

// Helper for formatting file sizes
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Session Statistics Tracker
const StatsTracker = {
  getStats() {
    return JSON.parse(localStorage.getItem('alip_stats') || '{"processed": 0, "success": 0, "failed": 0, "bytes": 0}');
  },
  update(success, bytes = 0) {
    let s = this.getStats();
    s.processed++;
    if (success) {
      s.success++;
      s.bytes += bytes;
    } else {
      s.failed++;
    }
    localStorage.setItem('alip_stats', JSON.stringify(s));
  }
};
