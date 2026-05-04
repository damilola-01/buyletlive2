import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black" aria-label="Breadcrumbs">
      <Link href="/" className="hover:text-brand-purple transition-colors">Home</Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          {item.href ? (
            <Link href={item.href} className="hover:text-brand-purple transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-brand-purple-dark">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
