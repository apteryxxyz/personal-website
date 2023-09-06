'use client';

import React, { useMemo } from 'react';
import { cn } from '@/utilities/class-name';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '../ui/context-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export function Code({
  className,
  ...p
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
  return (
    <code
      className={cn(
        'relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm',
        className,
      )}
      {...p}
    />
  );
}

function getContent(value: {}): string {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return (value as {}[]).map(getContent).join('');
  if (value && 'props' in value && 'data-line' in (value['props'] as {}))
    return Reflect.get(value['props'] as {}, 'data-line');
  return value?.toString();
}

export function Pre({
  className,
  ...p
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>) {
  const content = useMemo(() => {
    const children = (p.children as any).props.children;
    if (typeof children === 'string') return children;
    return getContent(children);
  }, [p.children]);

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Tooltip>
          <TooltipTrigger asChild>
            <pre
              data-content={'content'}
              className={cn(
                'my-4 overflow-x-auto rounded-lg border bg-black p-3 [&>code]:p-0',
                className,
              )}
              {...p}
            />
          </TooltipTrigger>

          <TooltipContent>Right click for options</TooltipContent>
        </Tooltip>
      </ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuItem onClick={() => navigator.clipboard.writeText(content)}>
          Copy
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}