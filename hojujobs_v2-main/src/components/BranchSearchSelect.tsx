import { useEffect, useMemo, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
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
  value: string;
  onChange: (branchId: string, branch: CompanyBranchOption) => void;
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
        .select("id, company_slug, branch_name, branch_label, address")
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
        .select("slug, name")
        .eq("is_active", true)
        .in("slug", slugs);

      const nameBySlug = new Map((profiles ?? []).map((profile) => [profile.slug, profile.name]));

      const options = branchRows
        .map((row) => ({
          id: row.id,
          company_slug: row.company_slug,
          branch_name: row.branch_name,
          branch_label: row.branch_label,
          address: row.address,
          company_name: nameBySlug.get(row.company_slug) ?? row.company_slug,
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

  const selectedBranch = useMemo(
    () => branches.find((branch) => branch.id === value) ?? null,
    [branches, value],
  );

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
          <span className="truncate">
            {loading ? "지점 불러오는 중..." : selectedBranch ? branchOptionLabel(selectedBranch) : "지점을 선택하세요"}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[min(28rem,calc(100vw-2rem))] p-0" align="start">
        <Command>
          <CommandInput placeholder="회사명, 지점명, 주소 검색" />
          <CommandList>
            <CommandEmpty>일치하는 지점이 없습니다.</CommandEmpty>
            <CommandGroup>
              {branches.map((branch) => (
                <CommandItem
                  key={branch.id}
                  value={`${branch.company_name} ${branch.branch_name} ${branch.branch_label ?? ""} ${branch.address}`}
                  onSelect={() => {
                    onChange(branch.id, branch);
                    setOpen(false);
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === branch.id ? "opacity-100" : "opacity-0")} />
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{branchOptionLabel(branch)}</p>
                    <p className="truncate text-xs text-muted-foreground">{branch.address}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
