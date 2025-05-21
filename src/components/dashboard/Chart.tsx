import React, { useEffect, useRef } from 'react';
import Card from '../ui/Card';

interface ChartProps {
  title: string;
  height?: number;
  // In a real application, we would pass in data and config
}

const Chart: React.FC<ChartProps> = ({
  title,
  height = 300,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mock chart rendering - in a real app this would use Chart.js, Recharts, etc.
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');
    
    // Draw a simple line chart
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 2;
    ctx.fillStyle = gradient;
    
    ctx.beginPath();
    
    // Generate some random data points
    const points = 10;
    const stepX = canvas.width / (points - 1);
    
    for (let i = 0; i < points; i++) {
      const x = i * stepX;
      // Random value, but with a slight trend upward
      const y = height - (Math.random() * 0.5 + 0.3 + i * 0.02) * height;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
    
    // Create fill
    ctx.lineTo(canvas.width, height);
    ctx.lineTo(0, height);
    ctx.fill();
    
    // Draw axis lines
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, height - 1);
    ctx.lineTo(canvas.width, height - 1);
    ctx.stroke();
    
    // Draw Y-axis grid lines
    const gridLines = 5;
    for (let i = 1; i < gridLines; i++) {
      const y = height * (i / gridLines);
      
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }, [height]);

  return (
    <Card title={title}>
      <div className="h-full">
        <canvas 
          ref={canvasRef} 
          height={height}
          width={800}
          className="w-full"
        ></canvas>
      </div>
    </Card>
  );
};

export default Chart;