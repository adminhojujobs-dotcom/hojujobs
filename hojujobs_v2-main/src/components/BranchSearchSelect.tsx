import { useEffect, useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { branchOptionLabel, type CompanyBranchOption } from "@/lib/userProfile";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface BranchSearchSelectProps {
  value: string[];
  onChange: (branchIds: string[], branches: CompanyBranchOption[]) => void;
  disabled?: boolean;
}

export function BranchSearchSelect({ value, onChange, disabled }: BranchSearchSelectProps) {
  const [open, setOpen] = useState(false);
  const [branches, setBranches] = useState<CompanyBranchOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchBranches() {
      setLoading(true);
      const { data: branchRows, error } = await supabase
        .from("company_branches")
        .select("id, company_slug, branch_name, branch_label, address, email")
        .eq("is_active", true)
        .order("company_slug", { ascending: true })
        .order("sort_order", { ascending: true });

      if (cancelled) return;

      if (error || !branchRows?.length) {
        setBranches([]);
        setLoading(false);
        return;
      }

      const slugs = [...new Set(branchRows.map((row) => row.company_slug))];
      const { data: profiles } = await supabase
        .from("company_profiles")
        .select("slug, name, logo_url")
        .eq("is_active", true)
        .in("slug", slugs);

      const nameBySlug = new Map((profiles ?? []).map((profile) => [profile.slug, profile.name]));
      const logoBySlug = new Map((profiles ?? []).map((profile) => [profile.slug, profile.logo_url]));

      const options = branchRows
        .map((row) => ({
          id: row.id,
          company_slug: row.company_slug,
          branch_name: row.branch_name,
          branch_label: row.branch_label,
          address: row.address,
          company_name: nameBySlug.get(row.company_slug) ?? row.company_slug,
          email: row.email,
          logo_url: logoBySlug.get(row.company_slug) ?? null,
        }))
        .filter((row) => nameBySlug.has(row.company_slug));

      setBranches(options);
      setLoading(false);
    }

    fetchBranches();
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedBranches = branches.filter((branch) => value.includes(branch.id));

  const toggleBranch = (branch: CompanyBranchOption) => {
    const nextIds = value.includes(branch.id) ? value.filter((id) => id !== branch.id) : [...value, branch.id];
    const nextBranches = branches.filter((b) => nextIds.includes(b.id));
    onChange(nextIds, nextBranches);
  };

  const removeBranch = (branchId: string) => {
    const nextIds = value.filter((id) => id !== branchId);
    onChange(nextIds, branches.filter((b) => nextIds.includes(b.id)));
  };

  const triggerLabel = loading
    ? "지점 불러오는 중..."
    : selectedBranches.length === 0
      ? "지점을 선택하세요"
      : selectedBranches.length === 1
        ? branchOptionLabel(selectedBranches[0])
        : `${branchOptionLabel(selectedBranches[0])} 외 ${selectedBranches.length - 1}곳`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled || loading}
          className="h-11 w-full justify-between font-normal"
        >
          <span className="truncate">{triggerLabel}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[min(28rem,calc(100vw-2rem))] p-0"
        align="start"
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <Command>
          <CommandInput placeholder="회사명, 지점명, 주소 검색" />
          <CommandList>
            <CommandEmpty>일치하는 지점이 없습니다.</CommandEmpty>
            <CommandGroup>
              {branches.map((branch) => {
                const isSelected = value.includes(branch.id);
                return (
                  <CommandItem
                    key={branch.id}
                    value={`${branch.company_name} ${branch.branch_name} ${branch.branch_label ?? ""} ${branch.address}`}
                    onSelect={() => toggleBranch(branch)}
                  >
                    <Check className={cn("mr-2 h-4 w-4 shrink-0", isSelected ? "opacity-100" : "opacity-0")} />
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-100 bg-white">
                      {branch.logo_url ? (
                        <img src={branch.logo_url} alt={branch.company_name} className="h-full w-full object-contain" />
                      ) : (
                        <span className="text-xs font-black text-slate-300">{branch.company_name.slice(0, 1)}</span>
                      )}
                    </div>
                    <div className="ml-2.5 min-w-0">
                      <p className="truncate font-semibold">{branchOptionLabel(branch)}</p>
                      <p className="truncate text-xs text-muted-foreground">{branch.address}</p>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>

        {selectedBranches.length > 0 && (
          <div className="flex flex-wrap gap-1.5 border-t border-slate-200 p-2.5">
            {selectedBranches.map((branch) => (
              <span
                key={branch.id}
                className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700"
              >
                {branchOptionLabel(branch)}
                <button
                  type="button"
                  onClick={() => removeBranch(branch.id)}
                  className="hover:text-blue-900"
                  aria-label={`${branchOptionLabel(branch)} 선택 해제`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
