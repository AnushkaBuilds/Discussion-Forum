import React from 'react';

const Avatar = ({
  src,
  alt,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <img
        src={src}
        alt={alt}
        className="rounded-full object-cover w-full h-full"
        onError={(e) => {
          const target = e.target;
          target.onerror = null;
          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(alt)}&background=random`;
        }}
      />
    </div>
  );
};

export default Avatar;