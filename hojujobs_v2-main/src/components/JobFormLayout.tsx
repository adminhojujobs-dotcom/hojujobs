import type { ReactNode } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const jobFormInputClass =
  "h-12 rounded-md border-slate-300 text-sm font-semibold shadow-none placeholder:text-slate-300 focus-visible:ring-blue-600";
export const jobFormTextareaClass =
  "rounded-md border-slate-300 text-sm font-semibold shadow-none placeholder:text-slate-300 focus-visible:ring-blue-600";

export function FormSection({
  title,
  required,
  action,
  children,
}: {
  title: string;
  required?: boolean;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-black text-neutral-950 sm:text-2xl">
          {title}
          {required && <span className="ml-1 text-red-500">*</span>}
        </h2>
        {action}
      </div>
      <div className="mt-4 border-b border-neutral-950" />
      <div className="mt-8 space-y-8">{children}</div>
    </section>
  );
}

export function FormRow({
  label,
  htmlFor,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
      <label htmlFor={htmlFor} className="text-sm font-bold text-neutral-950 sm:w-32 sm:shrink-0 sm:pt-3">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <div className="flex-1 space-y-1.5">
        {hint && <p className="text-xs font-semibold text-slate-400">{hint}</p>}
        {children}
      </div>
    </div>
  );
}

export interface ExtraField {
  label: string;
  value: string;
}

export function ExtraFieldsEditor({
  fields,
  onChange,
  labelPlaceholder,
  emptyHint,
}: {
  fields: ExtraField[];
  onChange: (fields: ExtraField[]) => void;
  labelPlaceholder: string;
  emptyHint: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-black text-neutral-950">추가 항목</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-md"
          onClick={() => onChange([...fields, { label: "", value: "" }])}
        >
          <Plus className="mr-1 h-4 w-4" />
          항목 추가
        </Button>
      </div>
      {fields.length === 0 ? (
        <p className="text-sm font-semibold text-slate-400">{emptyHint}</p>
      ) : (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={index} className="flex items-start gap-2">
              <Input
                value={field.label}
                onChange={(e) =>
                  onChange(fields.map((f, i) => (i === index ? { ...f, label: e.target.value } : f)))
                }
                placeholder={labelPlaceholder}
                className={`${jobFormInputClass} w-36 shrink-0`}
              />
              <Input
                value={field.value}
                onChange={(e) =>
                  onChange(fields.map((f, i) => (i === index ? { ...f, value: e.target.value } : f)))
                }
                placeholder="내용"
                className={jobFormInputClass}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onChange(fields.filter((_, i) => i !== index))}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
