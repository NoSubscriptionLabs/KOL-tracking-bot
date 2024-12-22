export function formatAlphaTweet(token, mainKol, kols, initialPrice) {
  if (mainKol.tradingStyle === 'short-term') {
    return `📊 ${mainKol.handle} spotted $${token} at $${initialPrice}
⚠️ Note: Known for short-term trades (usually <24h)
Other early eyes: ${kols.slice(1, 4).map(k => '@' + k.handle).join(', ')}
DYOR - Track the data 🔍`;
  }

  return `🎯 First 5 to spot $${token}:
${kols.slice(0, 5).map((k, i) => `${i + 1}. @${k.handle}`).join('\n')}
Initial price: $${initialPrice}
Real alpha comes early. 📈`;
}

export function formatQueryResponse(token, kols, initialPrice) {
  return `Data check on $${token}:
First mention by @${kols[0].handle} at $${initialPrice}
Also early: ${kols.slice(1, 3).map(k => '@' + k.handle).join(', ')}
Always DYOR 🔍`;
}