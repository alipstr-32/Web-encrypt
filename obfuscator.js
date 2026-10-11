// Code Obfuscation & Minification Engine
function obfuscateCode(code, language, level = 'medium') {
  if (language === 'javascript' || language === 'js') {
    // Simple robust custom JS token obfuscation / base64 wrap + safe eval wrapper or basic transforms
    if (level === 'high') {
      const encoded = btoa(code);
      return `/* ALIP ENCRYPTOR OBFUSCATED JS */\n(function(s){try{eval(atob(s));}catch(e){console.error('Execution error');}})("${encoded}");`;
    } else {
      // Basic identifier masking simulation or minification
      return code.replace(/\/\*[\s\S]*?\*\/|([^:])\/\/.*/g, '$1')
                 .replace(/\s+/g, ' ')
                 .trim();
    }
  } else if (language === 'html' || language === 'css' || language === 'json') {
    // Minification transformation
    return code.replace(/\s+/g, ' ').trim();
  } else {
    // Generic fallback for Python, PHP, C, etc.
    return `# ALIP ENCRYPTOR MINIFIED/PREPARED CODE (${language.toUpperCase()})\n` + 
           code.split('\n').filter(line => line.trim() && !line.trim().startsWith('#')).join('\n');
  }
}
