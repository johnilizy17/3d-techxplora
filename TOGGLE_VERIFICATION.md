# Public/Private Toggle Verification

## Toggle Location in CreateQuiz.jsx

The toggle button is located in **Step 2** of the quiz creation flow.

### Exact Location:
- **File**: `v2/src/pages/CreateQuiz.jsx`
- **Lines**: 611-649
- **Component**: `Step2`
- **Section**: Right column of the 2-column grid, after "Max Attempts" field

### Visual Structure:

```
Step 2: Quiz Settings
├── Left Column
│   ├── When to Start & End (card)
│   │   ├── Start Date & Time
│   │   └── End Date & Time
│   └── Points Info (card)
│       └── Points Left display
│
└── Right Column
    ├── Points & Difficulty (card)
    │   ├── Total Points
    │   ├── Quiz Difficulty dropdown
    │   ├── Min Age / Max Age
    │   └── Max Attempts
    │
    └── 🟢 Quiz Visibility Toggle (card) ← THIS IS THE TOGGLE
        ├── Icon (Globe or Lock)
        ├── Status text
        ├── Description text
        └── Toggle switch button
```

### How to See the Toggle:

1. Navigate to Create Quiz page (`/dashboard/quizzes/create`)
2. Fill in **Step 1** fields (title, description, duration, group)
3. Click "Continue" to go to **Step 2**
4. Scroll down in the right column
5. Below "Max Attempts" field, you should see:

```
┌─────────────────────────────────────────┐
│  🌐  Quiz Visibility                    │
│      Public - Live Quiz              [●→]│
│      Appears in Live Quiz page...        │
└─────────────────────────────────────────┘
```

### Toggle States:

**Public (ON - default)**:
- Green emerald background on toggle
- Globe icon (🌐)
- Text: "Public - Live Quiz"
- Description: "Appears in Live Quiz page for all students"
- Toggle pill position: RIGHT

**Private (OFF)**:
- Gray background on toggle
- Lock icon (🔒)
- Text: "Private - Code Only"
- Description: "Only accessible via quiz code"
- Toggle pill position: LEFT

### Code Snippet:

```jsx
{/* Public/Private Toggle */}
<div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 to-purple-500/10 border border-white/10">
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            {formData.public === 1 ? (
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Globe size={18} className="text-emerald-400" />
                </div>
            ) : (
                <div className="w-10 h-10 rounded-xl bg-gray-500/20 flex items-center justify-center">
                    <Lock size={18} className="text-gray-400" />
                </div>
            )}
            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">Quiz Visibility</p>
                <p className={`text-lg font-black italic ${formData.public === 1 ? 'text-emerald-400' : 'text-gray-400'}`}>
                    {formData.public === 1 ? 'Public - Live Quiz' : 'Private - Code Only'}
                </p>
                <p className="text-[10px] text-white/40 font-medium mt-1">
                    {formData.public === 1 
                        ? 'Appears in Live Quiz page for all students' 
                        : 'Only accessible via quiz code'}
                </p>
            </div>
        </div>
        <button
            type="button"
            onClick={() => handleChange({ target: { name: 'public', value: formData.public === 1 ? 0 : 1 } })}
            className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
                formData.public === 1 
                    ? 'bg-emerald-500' 
                    : 'bg-white/10'
            }`}
        >
            <div
                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-lg transition-transform duration-300 ${
                    formData.public === 1 ? 'translate-x-8' : 'translate-x-0'
                }`}
            />
        </button>
    </div>
</div>
```

### Troubleshooting:

If you don't see the toggle:

1. **Clear browser cache** and hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
2. **Check console** for any JavaScript errors
3. **Verify you're on Step 2** - the toggle only appears in Step 2, not Step 1
4. **Check if page is scrollable** - the toggle is at the bottom of the right column
5. **Inspect element** - search for "Quiz Visibility" text in the DOM

### Testing the Toggle:

1. Click the toggle switch (the rounded pill on the right)
2. Watch the icon change from Globe to Lock (or vice versa)
3. Watch the text change from "Public - Live Quiz" to "Private - Code Only"
4. Watch the toggle pill slide left/right
5. Watch the background color change from emerald-green to gray

### Data Flow:

```
User clicks toggle
    ↓
onClick handler fires
    ↓
handleChange({ target: { name: 'public', value: 0 or 1 } })
    ↓
formData.public updates
    ↓
UI re-renders with new state
    ↓
On submit: payload includes public: Number(formData.public)
```

### Default Value:

- `formData.public` defaults to `1` (public)
- This means quizzes are public by default
- Teachers must explicitly toggle to make them private

## Checklist:

- [ ] Navigate to Create Quiz page
- [ ] Complete Step 1
- [ ] Go to Step 2
- [ ] Scroll to bottom of right column
- [ ] See "Quiz Visibility" card with toggle
- [ ] Click toggle and watch it change
- [ ] Verify icon changes (Globe ↔ Lock)
- [ ] Verify text changes
- [ ] Verify toggle pill slides
- [ ] Create quiz and verify `public` field in payload
