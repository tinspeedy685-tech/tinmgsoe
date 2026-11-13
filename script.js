const inputField = document.getElementById('cmd-input');
const outputContainer = document.getElementById('output-container');
const terminalBody = document.getElementById('terminal-body');
const terminalWindow = document.getElementById('terminal-window');

let commandHistory = [];
let historyIndex = -1;

// 1. DEFINE ALL TERMINAL COMMANDS & HTML OUTPUTS
const commands = {
  help: `
    <div class="section-heading">Available Commands</div>
    <table class="cmd-table">
      <tr><td class="cmd-name">about</td><td>View dual Full Stack &amp; Cybersecurity profile summary</td></tr>
      <tr><td class="cmd-name">projects</td><td>Launch interactive clickable project cards (incl. Rohana Pet Shop)</td></tr>
      <tr><td class="cmd-name">skills</td><td>Inspect Full Stack Web, Pentesting, Cloud &amp; DevOps stack</td></tr>
      <tr><td class="cmd-name">experience</td><td>View CodeAlpha, ShadowFox, Freelance &amp; TryHackMe Top 1%</td></tr>
      <tr><td class="cmd-name">certs</td><td>List verified Cybersecurity &amp; SOC certifications</td></tr>
      <tr><td class="cmd-name">education</td><td>View MBA, First-Class B.Sc. Cybersecurity &amp; Diploma</td></tr>
      <tr><td class="cmd-name">contact</td><td>Display updated email, location &amp; languages</td></tr>
      <tr><td class="cmd-name">print</td><td>Export or print a clean, recruiter-ready PDF resume</td></tr>
      <tr><td class="cmd-name">clear</td><td>Clear the terminal screen</td></tr>
    </table>
  `,
  about: `
    <div class="section-heading">Whoami: Tin Maung Soe</div>
    <p><strong style="color: var(--prompt-user);">Full Stack Web Developer</strong> &amp; <strong style="color: var(--prompt-path);">Cybersecurity Specialist / Ethical Hacker</strong> based in Bangkok, Thailand.</p>
    <p style="margin-top: 0.45rem;">First-Class B.Sc. (Hons) Cybersecurity graduate currently pursuing an MBA at Bangkok University. Ranked in the <strong>Top 1% on TryHackMe</strong> with practical penetration testing experience (Burp Suite, Nmap, Metasploit, Wireshark) alongside full-stack web engineering (React, JavaScript, Node.js, Python, Firebase, CI/CD).</p>
  `,
  projects: `
    <div class="section-heading">Featured Projects (Click any card to launch)</div>
    <div class="project-grid">
      <a href="https://github.com/" target="_blank" rel="noopener noreferrer" class="project-card-link">
        <div class="project-tag">FULL STACK • REACT &amp; FIREBASE</div>
        <div class="project-title">Real-Time Chat Application ↗</div>
        <div class="project-desc">End-to-end real-time messaging platform featuring secure user authentication, instant message syncing, and cloud database storage.</div>
        <div class="project-cta">View source code on GitHub →</div>
      </a>

      <a href="https://tryhackme.com/" target="_blank" rel="noopener noreferrer" class="project-card-link">
        <div class="project-tag">OFFENSIVE SECURITY • TOP 1%</div>
        <div class="project-title">Pentesting &amp; Vulnerability Labs ↗</div>
        <div class="project-desc">100+ hands-on security labs covering web app exploitation (XSS, SQLi), privilege escalation, and network analysis using Burp Suite, Nmap &amp; Wireshark.</div>
        <div class="project-cta">Explore security labs →</div>
      </a>
    </div>
  `,
  skills: `
    <div class="section-heading">Technical Stack &amp; Security Arsenal</div>
    <ul class="term-list">
      <li><strong>Frontend &amp; Mobile:</strong> HTML, CSS, JavaScript, React.js, UI/UX &amp; SEO Optimization, Android (Java, Kotlin basics)</li>
      <li><strong>Backend &amp; Databases:</strong> Node.js, Firebase, Django, Python, MySQL, PostgreSQL</li>
      <li><strong>Cybersecurity &amp; Pentesting:</strong> Web/Mobile Pentesting (XSS, SQLi), Nmap, Burp Suite, Metasploit, Wireshark, Linux/Windows Hardening</li>
      <li><strong>Infrastructure &amp; DevOps:</strong> Docker, GitHub, GitHub Actions (CI/CD), Bash/Linux CLI, AWS &amp; Azure Fundamentals</li>
    </ul>
  `,
  experience: `
    <div class="section-heading">Experience &amp; Internships</div>
    <p><strong style="color: var(--prompt-user);">[Nov 2026 – Dec 2026] Full Stack Development Intern — CodeAlpha</strong></p>
    <ul class="term-list" style="margin-bottom: 0.75rem;">
      <li>Selected for the Virtual Full Stack Development Internship (Student ID: CA/DF1/434588), building full-stack web assignments and practical projects.</li>
    </ul>
    <p><strong style="color: var(--prompt-user);">[Jul 2022 – Present] Front-End &amp; Full Stack Developer — Freelance &amp; Projects</strong></p>
    <ul class="term-list" style="margin-bottom: 0.75rem;">
      <li>Built and deployed interactive web apps (including <a class="term-link" href="https://rohana-pet-shop.vercel.app" target="_blank" rel="noopener noreferrer">rohana-pet-shop.vercel.app</a>) using HTML, CSS, JavaScript, and React.</li>
      <li>Developed a real-time chat app with React &amp; Firebase, configured GitHub Actions CI/CD, and applied SEO &amp; load-time optimizations.</li>
    </ul>
    <p><strong style="color: var(--prompt-user);">[May 2024 – Jun 2024] Cybersecurity Intern — ShadowFox</strong></p>
    <ul class="term-list" style="margin-bottom: 0.75rem;">
      <li>Conducted web penetration testing uncovering XSS and SQL injection risks, analyzed traffic with Wireshark, and simulated attacks via Metasploit.</li>
    </ul>
    <p><strong style="color: var(--prompt-user);">[2021 – Present] Cybersecurity Researcher — TryHackMe (Top 1%) &amp; Hack The Box</strong></p>
    <ul class="term-list">
      <li>Completed 100+ challenges in ethical hacking, privilege escalation, and vulnerability assessment.</li>
    </ul>
  `,
  certs: `
    <div class="section-heading">Certifications &amp; Security Credentials</div>
    <ul class="term-list">
      <li><strong>SOC Level 1 &amp; SOC Level 2</strong> — TryHackMe</li>
      <li><strong>Junior Penetration Tester</strong> — TryHackMe</li>
      <li><strong>Offensive Pentesting</strong> — TryHackMe</li>
      <li><strong>Foundation Level Threat Intelligence Analyst</strong> — arcX</li>
      <li><strong>Certified Cyber Security Analyst</strong> — CyberWarFare Labs</li>
    </ul>
  `,
  education: `
    <div class="section-heading">Academic Background</div>
    <ul class="term-list">
      <li><strong>Master of Business Administration (MBA), English Program</strong> — Bangkok University (Jul 2026 – Present)</li>
      <li><strong>B.Sc. (Hons) Cybersecurity (First Class)</strong> — Coventry University (Jul 2022 – Oct 2023)</li>
      <li><strong>Higher Diploma in Business Infocom Technology</strong> — University of Sunderland (Nov 2019 – Dec 2020)</li>
    </ul>
  `,
  contact: `
    <div class="section-heading">Contact &amp; Languages</div>
    <ul class="term-list">
      <li><strong>Email:</strong> <a class="term-link" href="mailto:tinspeedy685@gmail.com">tinspeedy685@gmail.com</a></li>
      <li><strong>Location:</strong> Thailand</li>
      <li><strong>Languages:</strong> Burmese (Native), English (Fluent), Thai (Basic)</li>
    </ul>
  `
};

// 2. EXECUTE COMMANDS & RENDER TO TERMINAL
function runCommand(rawInput) {
  const cmd = rawInput.trim().toLowerCase();

  const block = document.createElement('div');
  block.className = 'output-block';

  const promptEcho = document.createElement('div');
  promptEcho.className = 'prompt-line';
  promptEcho.innerHTML = `<span class="user-host">visitor@tin-portfolio</span>:<span class="path">~</span>$ <span>${escapeHTML(rawInput)}</span>`;
  block.appendChild(promptEcho);

  if (cmd === '') {
    outputContainer.appendChild(block);
    scrollToBottom();
    return;
  }

  commandHistory.push(rawInput);
  historyIndex = commandHistory.length;

  if (cmd === 'clear') {
    outputContainer.innerHTML = '';
    return;
  }

  if (cmd === 'print') {
    const msg = document.createElement('p');
    msg.textContent = 'Opening clean print/PDF resume view...';
    block.appendChild(msg);
    outputContainer.appendChild(block);
    scrollToBottom();
    setTimeout(() => window.print(), 300);
    return;
  }

  const responseDiv = document.createElement('div');
  if (commands[cmd]) {
    responseDiv.innerHTML = commands[cmd];
  } else {
    responseDiv.innerHTML = `<p style="color: #f87171;">Command not found: <strong>${escapeHTML(cmd)}</strong>. Type <strong style="color: var(--prompt-user);">help</strong> to see valid commands.</p>`;
  }

  block.appendChild(responseDiv);
  outputContainer.appendChild(block);
  scrollToBottom();
}

// Sanitize user input against XSS
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag]));
}

function scrollToBottom() {
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

// 3. KEYBOARD LISTENERS (ENTER & ARROW HISTORY)
inputField.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    runCommand(inputField.value);
    inputField.value = '';
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      inputField.value = commandHistory[historyIndex];
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      inputField.value = commandHistory[historyIndex];
    } else {
      historyIndex = commandHistory.length;
      inputField.value = '';
    }
  }
});

// 4. CLICKABLE QUICK-COMMAND CHIPS
document.querySelectorAll('.cmd-chip').forEach(btn => {
  btn.addEventListener('click', () => {
    const cmd = btn.getAttribute('data-cmd');
    runCommand(cmd);
    inputField.focus();
  });
});

// Keep focus on terminal input unless user clicks a button or project link
terminalWindow.addEventListener('click', (e) => {
  if (!e.target.closest('button') && !e.target.closest('a')) {
    inputField.focus();
  }
});
