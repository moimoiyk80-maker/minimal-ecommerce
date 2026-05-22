function HighlightedText({
    text,
    highlight
  }) {
  
    if (!highlight.trim()) {
      return text;
    }
  
    const regex = new RegExp(
      `(${highlight})`,
      "gi"
    );
  
    const parts = text.split(regex);
  
    return parts.map((part, index) => {
  
      const isMatch =
        part.toLowerCase() ===
        highlight.toLowerCase();
  
      return isMatch ? (
  
        <mark
          key={index}
          className="highlight-text"
        >
          {part}
        </mark>
  
      ) : (
        part
      );
    });
  }
  
  export default HighlightedText;