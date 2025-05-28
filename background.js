/**
 * Reads the user-configured delay (in seconds) or defaults to 60s.
 */
async function getDelay() {
  const { clearDelay = 60 } = await browser.storage.sync.get('clearDelay');
  return Number(clearDelay) || 60;
}

/**
 * On download completion, schedule a clear via setTimeout.
 */
browser.downloads.onChanged.addListener((delta) => {
  if (!delta.state || delta.state.current !== 'complete') return;
  const downloadId = delta.id;
  getDelay().then(delay => {
    console.log(`Download ${downloadId} completed; clearing in ${delay}s.`);
    setTimeout(() => {
      browser.downloads.erase({ id: downloadId })
        .then(() => console.log(`Erased download ${downloadId}.`))
        .catch(err => console.error(`Error erasing ${downloadId}:`, err));
    }, delay * 1000);
  }).catch(err => console.error('Error getting delay:', err));
});