
import { useEffect, useRef } from 'react';

interface MathRendererProps {
  latex: string;
  inline?: boolean;
}

const MathRenderer = ({ latex, inline = false }: MathRendererProps) => {
  const mathRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderMath = async () => {
      if (!mathRef.current) return;

      // Load MathJax if not already loaded
      if (!(window as any).MathJax) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
        script.async = true;
        
        script.onload = () => {
          (window as any).MathJax = {
            tex: {
              inlineMath: [['$', '$'], ['\\(', '\\)']],
              displayMath: [['$$', '$$'], ['\\[', '\\]']]
            },
            options: {
              menuOptions: {
                settings: {
                  zoom: 'NoZoom'
                }
              }
            }
          };
          
          (window as any).MathJax.startup.document.ready();
          renderCurrentMath();
        };
        
        document.head.appendChild(script);
      } else {
        renderCurrentMath();
      }
    };

    const renderCurrentMath = () => {
      if (mathRef.current && (window as any).MathJax) {
        const formattedLatex = inline ? `$${latex}$` : `$$${latex}$$`;
        mathRef.current.innerHTML = formattedLatex;
        
        (window as any).MathJax.typesetPromise([mathRef.current]).catch((err: any) => {
          console.error('MathJax rendering error:', err);
          // Fallback to plain text
          if (mathRef.current) {
            mathRef.current.textContent = latex;
          }
        });
      }
    };

    renderMath();
  }, [latex, inline]);

  return (
    <div 
      ref={mathRef}
      className={`text-white ${inline ? 'inline' : 'text-center text-2xl py-4'}`}
      style={{ minHeight: inline ? 'auto' : '60px' }}
    >
      {/* Fallback content while MathJax loads */}
      {latex}
    </div>
  );
};

export default MathRenderer;
