import { useState, useEffect } from "react";
import hojuJobsLogo from "@/assets/hoju-jobs-logo.png";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ArrowLeft, Trash2, Shield, ExternalLink, Pencil, MapPin, Check, X, Sparkles, ShoppingBag } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { LocationPicker } from "@/components/LocationPicker";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Job {
  id: number;
  title: string | null;
  location: string[] | null;
  industry: string | null;
  uploaded_at: string | null;
  user_id: string | null;
  Promoted: boolean | null;
}

interface Deal {
  rank: number;
  title: string;
  category: string;
  image_url: string | null;
  uploaded_at: string;
  promoted: boolean;
}

function clearPromotionCaches() {
  try {
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith("hoju_listing_cache_")) sessionStorage.removeItem(key);
    });
    sessionStorage.removeItem("hoju_sales_cache");
  } catch {}
}

export default function Admin() {
  useSEO({ title: "관리자 | Hoju Jobs", description: "Hoju Jobs 관리자 페이지", noindex: true });
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingDeals, setLoadingDeals] = useState(true);
  const [availableLocations, setAvailableLocations] = useState<string[]>([]);
  const [editingLocationId, setEditingLocationId] = useState<number | null>(null);
  const [editingLocations, setEditingLocations] = useState<string[]>([]);
  const [savingLocation, setSavingLocation] = useState(false);
  const [savingPromotionKey, setSavingPromotionKey] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/");
      return;
    }
    if (user && isAdmin) {
      fetchJobs();
      fetchDeals();
    }
  }, [user, isAdmin, loading]);

  const fetchJobs = async () => {
    setLoadingJobs(true);
    const { data, error } = await supabase
      .from("jobs")
      .select("id, title, location, industry, uploaded_at, user_id, Promoted")
      .order("uploaded_at", { ascending: false });
    if (!error && data) {
      setJobs(data);
      setAvailableLocations([...new Set(data.flatMap((j) => j.location ?? []))].sort());
    }
    setLoadingJobs(false);
  };

  const fetchDeals = async () => {
    setLoadingDeals(true);
    const { data, error } = await supabase
      .from("ozbargain_deals")
      .select("rank, title, category, image_url, uploaded_at, promoted")
      .order("promoted", { ascending: false })
      .order("rank", { ascending: true });

    if (!error && data) {
      setDeals(data);
    }
    setLoadingDeals(false);
  };

  const startEditingLocation = (job: Job) => {
    setEditingLocationId(job.id);
    setEditingLocations(job.location ?? []);
  };

  const cancelEditingLocation = () => {
    setEditingLocationId(null);
    setEditingLocations([]);
  };

  const saveLocation = async (id: number) => {
    setSavingLocation(true);
    const { error } = await supabase.from("jobs").update({ location: editingLocations }).eq("id", id);
    if (error) {
      toast.error("저장 실패: " + error.message);
    } else {
      toast.success("지역이 수정되었습니다.");
      setJobs((prev) => prev.map((j) => j.id === id ? { ...j, location: editingLocations } : j));
      setEditingLocationId(null);
    }
    setSavingLocation(false);
  };

  const deleteJob = async (id: number) => {
    const { error } = await supabase.from("jobs").delete().eq("id", id);
    if (error) {
      toast.error("삭제 실패: " + error.message);
    } else {
      toast.success("공고가 삭제되었습니다.");
      setJobs((prev) => prev.filter((j) => j.id !== id));
      clearPromotionCaches();
    }
  };

  const toggleJobPromotion = async (job: Job, promoted: boolean) => {
    const key = `job-${job.id}`;
    setSavingPromotionKey(key);
    const { error } = await supabase.from("jobs").update({ Promoted: promoted }).eq("id", job.id);

    if (error) {
      toast.error("추천 공고 저장 실패: " + error.message);
    } else {
      setJobs((prev) => prev.map((item) => item.id === job.id ? { ...item, Promoted: promoted } : item));
      clearPromotionCaches();
      toast.success(promoted ? "추천 공고로 설정되었습니다." : "추천 공고에서 해제되었습니다.");
    }

    setSavingPromotionKey(null);
  };

  const toggleDealPromotion = async (deal: Deal, promoted: boolean) => {
    const key = `deal-${deal.rank}`;
    setSavingPromotionKey(key);
    const { error } = await supabase.from("ozbargain_deals").update({ promoted }).eq("rank", deal.rank);

    if (error) {
      toast.error("메인 카드 딜 저장 실패: " + error.message);
    } else {
      setDeals((prev) => prev.map((item) => item.rank === deal.rank ? { ...item, promoted } : item));
      clearPromotionCaches();
      toast.success(promoted ? "메인 카드 딜로 설정되었습니다." : "메인 카드 딜에서 해제되었습니다.");
    }

    setSavingPromotionKey(null);
  };

  if (loading) return <div className="flex w-full min-h-0 flex-1 items-center justify-center bg-background text-muted-foreground">로딩 중...</div>;
  if (!isAdmin) return null;

  return (
    <div className="flex w-full min-h-0 flex-1 flex-col bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6 space-y-4">
          <Link to="/">
            <img src={hojuJobsLogo} alt="Hoju Jobs" className="h-8 hover:opacity-80 transition-opacity" />
          </Link>
          <Link to="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            홈으로
          </Link>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">관리자 대시보드</h2>
        </div>

        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-base font-bold text-foreground">
              <Sparkles className="h-4 w-4 text-amber-500" />
              추천 공고 선택
            </h3>
            <p className="text-sm text-muted-foreground">
              총 <span className="font-semibold text-foreground">{jobs.length}</span>개의 공고 중 메인 상단에 노출할 공고를 선택하세요.
            </p>
          </div>
          <p className="text-xs font-semibold text-amber-700">
            선택됨 {jobs.filter((job) => job.Promoted === true).length}
          </p>
        </div>

        {loadingJobs ? (
          <div className="text-center py-16 text-muted-foreground">불러오는 중...</div>
        ) : (
          <div className="space-y-2">
            {jobs.map((job) => (
              <div key={job.id} className="p-4 rounded-lg border bg-card space-y-2">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Link to={`/job/${job.id}`} className="font-semibold text-foreground hover:text-primary truncate">
                        {job.title}
                      </Link>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {(job.location || []).join(", ")}
                      {job.industry ? `  ${job.industry}` : ""}
                      {job.uploaded_at ? `  ${new Date(job.uploaded_at).toLocaleDateString("ko-KR")}` : ""}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <div className="flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                      <span className="text-xs font-semibold text-amber-800">추천</span>
                      <Switch
                        checked={job.Promoted === true}
                        disabled={savingPromotionKey === `job-${job.id}`}
                        onCheckedChange={(checked) => void toggleJobPromotion(job, checked)}
                        aria-label={`${job.title ?? "공고"} 추천 공고 설정`}
                      />
                    </div>
                    <Button variant="outline" size="sm" className="gap-1.5" onClick={() => startEditingLocation(job)}>
                      <MapPin className="h-3.5 w-3.5" /> 지역
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1.5" onClick={() => navigate(`/edit-job/${job.id}?from=admin`)}>
                      <Pencil className="h-3.5 w-3.5" /> 수정
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" className="gap-1.5">
                          <Trash2 className="h-3.5 w-3.5" /> 삭제
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>공고를 삭제하시겠습니까?</AlertDialogTitle>
                          <AlertDialogDescription>
                            "{job.title}" 공고가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>취소</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteJob(job.id)}>삭제</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                {editingLocationId === job.id && (
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex-1">
                      <LocationPicker
                        availableLocations={availableLocations}
                        selectedLocations={editingLocations}
                        onLocationsChange={setEditingLocations}
                      />
                    </div>
                    <Button size="sm" className="gap-1.5 shrink-0" onClick={() => saveLocation(job.id)} disabled={savingLocation}>
                      <Check className="h-3.5 w-3.5" /> 저장
                    </Button>
                    <Button size="sm" variant="ghost" className="shrink-0" onClick={cancelEditingLocation}>
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-base font-bold text-foreground">
              <ShoppingBag className="h-4 w-4 text-emerald-600" />
              메인 카드 딜 선택
            </h3>
            <p className="text-sm text-muted-foreground">
              온세일 딜 중 메인 페이지 프로모션 카드에 보여줄 예시 딜을 선택하세요.
            </p>
          </div>
          <p className="text-xs font-semibold text-emerald-700">
            선택됨 {deals.filter((deal) => deal.promoted).length}
          </p>
        </div>

        {loadingDeals ? (
          <div className="text-center py-16 text-muted-foreground">딜 불러오는 중...</div>
        ) : deals.length === 0 ? (
          <div className="rounded-lg border bg-card px-4 py-12 text-center text-sm text-muted-foreground">
            등록된 딜이 없습니다.
          </div>
        ) : (
          <div className="space-y-2">
            {deals.map((deal) => (
              <div key={deal.rank} className="flex flex-col gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  {deal.image_url && (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-white p-1.5">
                      <img
                        src={deal.image_url}
                        alt={deal.title}
                        className="max-h-full w-full object-contain"
                        onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = "none"; }}
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Link to={`/sales/${deal.rank}`} className="truncate font-semibold text-foreground hover:text-primary">
                        {deal.title}
                      </Link>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    </div>
                    <p className="truncate text-sm text-muted-foreground">
                      #{deal.rank}  {deal.category}  {new Date(deal.uploaded_at).toLocaleDateString("ko-KR")}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1.5">
                  <ShoppingBag className="h-3.5 w-3.5 text-emerald-700" />
                  <span className="text-xs font-semibold text-emerald-800">메인 카드</span>
                  <Switch
                    checked={deal.promoted}
                    disabled={savingPromotionKey === `deal-${deal.rank}`}
                    onCheckedChange={(checked) => void toggleDealPromotion(deal, checked)}
                    aria-label={`${deal.title} 메인 카드 딜 설정`}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
