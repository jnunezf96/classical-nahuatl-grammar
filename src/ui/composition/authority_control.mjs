// Styled menus precede their native owner in some fields. Classification and
// availability belong to the native control, independently of display order.
export function getAuthorityControl(wrapper) {
  return wrapper?.querySelector?.('[data-classical-rule-logic-control]')
    || wrapper?.querySelector?.('select, input, button') || null;
}

// Restoring an authored draft differs from choosing a fallback: another legal
// value in the editor must not replace the selected constituent's choice.
export function projectAuthoredChoice(control, value, {document, prompt} = {}) {
  if (!control || value == null) return;
  const selected = String(value);
  if (selected === '' && prompt && !Array.from(control.options || []).some(option => option.value === '')) {
    const option = document.createElement('option');
    option.value = ''; option.textContent = prompt; control.append(option);
  }
  control.value = selected;
}
