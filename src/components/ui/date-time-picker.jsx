import * as React from "react"
import { CalendarIcon, Check } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"))
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"))

const toDate = (value) => {
    if (!value) return null
    const parsed = new Date(value)
    return isNaN(parsed.getTime()) ? null : parsed
}

const toPickerValue = (date) => format(date, "yyyy-MM-dd'T'HH:mm")

const selectClass =
    "flex h-10 w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 hover:bg-white/10 cursor-pointer"

const selectStyle = {
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
    backgroundPosition: "right 0.5rem center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "1.5em 1.5em",
    paddingRight: "2.5rem",
}

function DateTimePicker({
    id,
    value,
    onChange,
    placeholder = "Select date & time",
    className,
    disabled,
}) {
    const [open, setOpen] = React.useState(false)
    const [draft, setDraft] = React.useState(() => toDate(value) || new Date())

    React.useEffect(() => {
        setDraft(toDate(value) || new Date())
    }, [value])

    const selected = toDate(value)

    const selectDay = (day) => {
        const next = new Date(day)
        next.setHours(draft.getHours(), draft.getMinutes(), 0, 0)
        setDraft(next)
        onChange(toPickerValue(next))
    }

    const selectPart = (part, raw) => {
        const next = new Date(draft)
        if (part === "hour") next.setHours(Number(raw), draft.getMinutes(), 0, 0)
        else next.setMinutes(Number(raw), 0, 0)
        setDraft(next)
        onChange(toPickerValue(next))
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    id={id}
                    type="button"
                    disabled={disabled}
                    className={cn(
                        "flex h-11 w-full items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
                        className
                    )}
                >
                    <span className={cn("truncate", !selected && "text-white/40")}>
                        {selected ? format(selected, "MMM d, yyyy 'at' HH:mm") : placeholder}
                    </span>
                    <CalendarIcon size={16} className="shrink-0 text-white/40" />
                </button>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                side="bottom"
                sideOffset={8}
                collisionPadding={16}
                className="flex max-h-[var(--radix-popper-available-height)] w-[20rem] flex-col border-white/10 bg-[#0d0d0d]/95 p-0 text-white shadow-2xl backdrop-blur-2xl"
            >
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3">
                    <Calendar
                        mode="single"
                        selected={draft}
                        onSelect={selectDay}
                        defaultMonth={draft}
                        showOutsideDays
                        className="p-0"
                        classNames={{
                            months: "flex flex-col",
                            caption: "flex justify-center pt-1 relative items-center",
                            caption_label: "text-sm font-black text-white",
                            nav: "space-x-1 flex items-center",
                            nav_button:
                                "h-7 w-7 bg-transparent p-0 opacity-60 hover:opacity-100 text-white hover:bg-white/10 inline-flex items-center justify-center rounded-md",
                            nav_button_previous: "absolute left-1",
                            nav_button_next: "absolute right-1",
                            head_cell: "text-white/40 rounded-md w-8 font-black text-[10px] uppercase tracking-widest",
                            row: "flex w-full mt-1",
                            day: "h-8 w-8 p-0 font-bold text-white/80 hover:bg-white/10 hover:text-white rounded-lg",
                            day_selected: "bg-blue-600 text-white hover:bg-blue-600 hover:text-white",
                            day_today: "bg-white/10 text-white",
                            day_outside: "text-white/25",
                        }}
                    />
                </div>

                <div className="shrink-0 border-t border-white/10 p-3">
                    <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-white/40">Time</p>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label htmlFor={`${id}-hour`} className="text-[10px] font-bold uppercase tracking-wider text-white/30">
                                Hour
                            </label>
                            <select
                                id={`${id}-hour`}
                                className={selectClass}
                                style={selectStyle}
                                value={String(draft.getHours()).padStart(2, "0")}
                                onChange={(e) => selectPart("hour", e.target.value)}
                            >
                                {HOURS.map((h) => (
                                    <option key={h} value={h} className="bg-[#0d0d0d] text-white">
                                        {h}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label htmlFor={`${id}-minute`} className="text-[10px] font-bold uppercase tracking-wider text-white/30">
                                Minute
                            </label>
                            <select
                                id={`${id}-minute`}
                                className={selectClass}
                                style={selectStyle}
                                value={String(draft.getMinutes()).padStart(2, "0")}
                                onChange={(e) => selectPart("minute", e.target.value)}
                            >
                                {MINUTES.map((m) => (
                                    <option key={m} value={m} className="bg-[#0d0d0d] text-white">
                                        {m}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex shrink-0 items-center justify-between gap-3 border-t border-white/10 p-3">
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-white/40 transition-colors hover:text-rose-400"
                    >
                        Clear
                    </button>
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white transition-colors hover:bg-blue-500"
                    >
                        <Check size={14} />
                        Done
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export { DateTimePicker }
