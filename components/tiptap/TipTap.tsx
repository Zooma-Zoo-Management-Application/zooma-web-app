"use client"

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle, { TextStyleOptions } from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Youtube from '@tiptap/extension-youtube'
import React from 'react'
import { Button } from '../ui/button'
import '@/styles/tiptap.scss'
import { Bold, Code, CornerDownLeft, Eraser, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Italic, List, ListOrdered, Pilcrow, Redo, RemoveFormatting, SquareCode, Strikethrough, TextQuote, Undo, WrapText, YoutubeIcon } from 'lucide-react'
import { Input } from '../ui/input'
import { TableOfContent } from '@tiptap-pro/extension-table-of-content'
import { ToC } from './ToC'

const MemorizedToC = React.memo(ToC)

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  const handleAddYoutube = () => {
    let url = prompt('Enter Youtube URL')
    if (url) {
      editor.chain().focus().setYoutubeVideo({
        src: url || "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        width: 640,
        height: 360,
      }).run()
    }
  }

  return (
    <>
      <div className='flex gap-2 mt-2 flex-wrap sticky top-0 bg-[#fff] z-10 py-4 px-4 border-b mb-4'>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={editor.isActive('bold') ? 'text-light bg-dark hover:text-light hover:bg-dark' : ''}
          variant="outline"
          size="icon"
        >
          <Bold className='w-4 h-4' />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? 'text-light bg-dark hover:text-light hover:bg-dark' : ''}
          variant="outline"
          size="icon"
        >
          <Italic className='w-4 h-4' />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={editor.isActive('strike') ? 'text-light bg-dark hover:text-light hover:bg-dark' : ''}
          variant="outline"
          size="icon"
        >
          <Strikethrough className='w-4 h-4' />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className={editor.isActive('code') ? 'text-light bg-dark hover:text-light hover:bg-dark' : ''}
          variant="outline"
          size="icon"
        >
          <Code className='w-4 h-4' />
        </Button>
        <Button 
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          variant="outline"
          size="icon"
        >
          <Eraser className='w-4 h-4' />
        </Button>
        <Button 
          type="button"
          onClick={() => editor.chain().focus().clearNodes().run()}
          variant="outline"
          size="icon"
        >
          <RemoveFormatting className='w-4 h-4' />
        </Button>
        <Input type='color' className='w-10 p-1 rounded-sm' value="#000" onChange={(e) => editor.chain().focus().setColor(e.target.value).run()} />
        <Button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'text-light bg-dark hover:text-light hover:bg-dark' : ''}
          variant="outline"
          size="icon"
        >
          <Pilcrow className='w-4 h-4' />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'text-light bg-dark hover:text-light hover:bg-dark' : ''}
          variant="outline"
          size="icon"
        >
          <Heading1 className='w-4 h-4' />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'text-light bg-dark hover:text-light hover:bg-dark' : ''}
          variant="outline"
          size="icon"
        >
          <Heading2 className='w-4 h-4' />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'text-light bg-dark hover:text-light hover:bg-dark' : ''}
          variant="outline"
          size="icon"
        >
          <Heading3 className='w-4 h-4' />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive('heading', { level: 4 }) ? 'text-light bg-dark hover:text-light hover:bg-dark' : ''}
          variant="outline"
          size="icon"
        >
          <Heading4 className='w-4 h-4' />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editor.isActive('heading', { level: 5 }) ? 'text-light bg-dark hover:text-light hover:bg-dark' : ''}
          variant="outline"
          size="icon"
        >
          <Heading5 className='w-4 h-4' />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editor.isActive('heading', { level: 6 }) ? 'text-light bg-dark hover:text-light hover:bg-dark' : ''}
          variant="outline"
          size="icon"
        >
          <Heading6 className='w-4 h-4' />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'text-light bg-dark hover:text-light hover:bg-dark' : ''}
          variant="outline"
          size="icon"
        >
          <List className='w-4 h-4' />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'text-light bg-dark hover:text-light hover:bg-dark' : ''}
          variant="outline"
          size="icon"
        >
          <ListOrdered className='w-4 h-4' />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'text-light bg-dark hover:text-light hover:bg-dark' : ''}
          variant="outline"
          size="icon"
        >
          <SquareCode className='w-4 h-4' />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'text-light bg-dark hover:text-light hover:bg-dark' : ''}
          variant="outline"
          size="icon"
        >
          <TextQuote className='w-4 h-4'/>
        </Button>
        <Button 
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          variant="outline"
          size="icon"
        >
          <WrapText className='w-4 h-4' />
        </Button>
        <Button 
          type="button"
          onClick={() => editor.chain().focus().setHardBreak().run()}
          variant="outline"
          size="icon"
        >
          <CornerDownLeft className='w-4 h-4' />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
          variant="outline"
          size="icon"
        >
          <Undo className='w-4 h-4' />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
          variant="outline"
          size="icon"
        >
          <Redo className='w-4 h-4' />
        </Button>
        <Button
          type="button"
          onClick={() => handleAddYoutube()}
          variant="outline"
          size="icon"
        >
          <YoutubeIcon className='w-4 h-4' />
        </Button>
      </div>
      <div className="table-of-content">
        <MemorizedToC editor={editor} items={editor.storage.tableOfContent.content} />
      </div>
    </>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] } as Partial<TextStyleOptions> | undefined),
  TextStyle.configure({ HTMLAttributes: { li: { class: 'my-list-item' }} }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  Youtube.configure({
    inline: false,
    HTMLAttributes: {
      class: 'w-full aspect-video md:aspect-square',
  },
  }),
  TableOfContent
]

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`

export default function Tiptap({content = "<h2>This is a title</h2>", editable=true, handleUpdate=(string:string) => {}}) {
  return (
    <div className='tiptap'>
      <EditorProvider 
        slotBefore={<>
          {editable && <MenuBar />}
        </>} 
        extensions={extensions} 
        content={content}
        editable={editable}
          onUpdate={
            ({ editor }) => {
              handleUpdate(editor.getHTML())
            }
          }
        >
      </EditorProvider>
    </div>
  )
}
