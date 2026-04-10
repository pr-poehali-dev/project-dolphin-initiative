import { useState, useRef } from "react";
import {
  Download,
  Shield,
  Zap,
  Eye,
  Clock,
  Github,
  ArrowRight,
  Hash,
  Users,
  Mic,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Monitor,
  User,
  Lock,
  Volume2,
  CreditCard,
  EyeOff,
  Wrench,
  Camera,
  Image,
  Link,
  Star,
  ChevronRight,
  Sun,
  Moon,
  Upload,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Icon from "@/components/ui/icon";

type UploadModalType = "banner" | "avatar" | null;

const UploadModal = ({
  type,
  currentImage,
  onClose,
  onUpload,
}: {
  type: UploadModalType;
  currentImage: string | null;
  onClose: () => void;
  onUpload: (url: string) => void;
}) => {
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!type) return null;

  const isBanner = type === "banner";

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Заголовок */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-2">
            <Icon name={isBanner ? "Image" : "Camera"} size={18} className="text-[#10A37F]" />
            <h3 className="text-[#1a1a2e] font-semibold">
              {isBanner ? "Загрузить баннер" : "Загрузить аватар"}
            </h3>
          </div>
          <button onClick={onClose} className="text-[#6b7280] hover:text-[#1a1a2e] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Зона drag-and-drop */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`relative rounded-xl border-2 border-dashed cursor-pointer transition-all overflow-hidden
              ${dragging
                ? "border-[#10A37F] bg-[#e8f5f0] scale-[1.01]"
                : "border-[#d1d5db] hover:border-[#10A37F] hover:bg-[#f0faf7]"
              }
              ${isBanner ? "h-36" : "h-44 flex items-center justify-center"}
            `}
          >
            {preview ? (
              isBanner ? (
                <img src={preview} alt="banner" className="w-full h-full object-cover" />
              ) : (
                <img src={preview} alt="avatar" className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md" />
              )
            ) : (
              <div className={`flex flex-col items-center justify-center gap-3 text-center p-4 ${isBanner ? "h-full" : ""}`}>
                <div className={`rounded-full flex items-center justify-center ${dragging ? "bg-[#10A37F]" : "bg-[#f3f4f6]"} transition-colors`}
                  style={{ width: 52, height: 52 }}>
                  <Upload className={`w-6 h-6 ${dragging ? "text-white" : "text-[#10A37F]"}`} />
                </div>
                <div>
                  <p className="text-[#1a1a2e] font-medium text-sm">
                    {dragging ? "Отпустите файл..." : "Перетащите файл или нажмите"}
                  </p>
                  <p className="text-[#9ca3af] text-xs mt-0.5">PNG, JPG, GIF до 8 МБ</p>
                </div>
              </div>
            )}

            {/* Оверлей при наличии превью */}
            {preview && (
              <div className={`absolute inset-0 flex items-center justify-center gap-2 transition-opacity bg-black/40 ${dragging ? "opacity-100" : "opacity-0 hover:opacity-100"}`}>
                <div className="bg-white/90 text-[#1a1a2e] text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  Заменить
                </div>
              </div>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />

          {/* Рекомендации */}
          <div className="bg-[#f9fafb] rounded-lg p-3 text-xs text-[#6b7280] space-y-1">
            {isBanner ? (
              <>
                <p>Рекомендуемый размер: <span className="text-[#374151] font-medium">600 × 240 пикселей</span></p>
                <p>Минимальная ширина: <span className="text-[#374151] font-medium">480 пикселей</span></p>
              </>
            ) : (
              <>
                <p>Рекомендуемый размер: <span className="text-[#374151] font-medium">256 × 256 пикселей</span></p>
                <p>Изображение будет обрезано до круга</p>
              </>
            )}
          </div>

          {/* Кнопки */}
          <div className="flex gap-3 pt-1">
            {preview && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPreview(null)}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                Удалить
              </Button>
            )}
            <div className="flex-1" />
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="border-[#d1d5db] text-[#374151]"
            >
              Отмена
            </Button>
            <Button
              size="sm"
              disabled={!preview}
              onClick={() => { if (preview) { onUpload(preview); onClose(); } }}
              className="bg-[#10A37F] hover:bg-[#0d8f6f] text-white disabled:opacity-40"
            >
              Применить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

type SettingsSection =
  | "profile"
  | "notifications"
  | "appearance"
  | "profileCard"
  | null;

type SettingsMenu =
  | "myProfile"
  | "security"
  | "voiceVideo"
  | "subscriptions"
  | "privacy"
  | "admin";

const settingsMenuItems: { id: SettingsMenu; label: string; icon: string }[] = [
  { id: "myProfile", label: "Мой профиль", icon: "User" },
  { id: "security", label: "Безопасность", icon: "Lock" },
  { id: "voiceVideo", label: "Голос и видео", icon: "Volume2" },
  { id: "subscriptions", label: "Подписки", icon: "CreditCard" },
  { id: "privacy", label: "Конфиденциальность", icon: "EyeOff" },
  { id: "admin", label: "Администрирование", icon: "Wrench" },
];

const SettingsPage = ({ onClose }: { onClose: () => void }) => {
  const [activeMenu, setActiveMenu] = useState<SettingsMenu>("myProfile");
  const [activeSection, setActiveSection] = useState<SettingsSection>("profile");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [uploadModal, setUploadModal] = useState<UploadModalType>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const [notifications, setNotifications] = useState({
    messages: true,
    mentions: true,
    sounds: false,
    desktop: true,
  });
  const [profile, setProfile] = useState({
    login: "maria_design",
    nickname: "МашаДизайн",
    firstName: "Мария",
    lastName: "Иванова",
    birthdate: "1995-06-15",
    status: "Работаю в Figma ✏️",
  });
  const [socials, setSocials] = useState({
    github: "",
    twitter: "",
    dribbble: "",
    behance: "",
  });

  const renderContent = () => {
    if (activeMenu === "subscriptions") {
      const plans = [
        {
          id: "free",
          name: "Бесплатный",
          price: "0 ₽",
          period: "навсегда",
          active: false,
          color: "#6b7280",
          bg: "#f9fafb",
          border: "#e5e7eb",
          features: ["До 5 проектов", "Базовые шаблоны", "Экспорт PNG", "Поддержка через чат"],
        },
        {
          id: "pro",
          name: "Pro",
          price: "690 ₽",
          period: "в месяц",
          active: true,
          color: "#10A37F",
          bg: "#e8f5f0",
          border: "#10A37F",
          features: ["Безлимитные проекты", "Все шаблоны", "Экспорт в любом формате", "Приоритетная поддержка", "Командная работа до 5 чел."],
        },
        {
          id: "business",
          name: "Бизнес",
          price: "2 490 ₽",
          period: "в месяц",
          active: false,
          color: "#7c3aed",
          bg: "#f5f3ff",
          border: "#7c3aed",
          features: ["Всё из Pro", "Команда до 50 чел.", "Аналитика и отчёты", "Выделенный менеджер", "SLA 99.9%", "API доступ"],
        },
      ];

      return (
        <div className="flex-1 overflow-y-auto p-6 max-w-3xl">
          {/* Статус */}
          <div className="mb-8">
            <h2 className="text-[#1a1a2e] font-bold text-xl mb-4">Подписки</h2>
            <div className="flex items-center gap-4 p-5 bg-[#e8f5f0] rounded-2xl border border-[#10A37F]/30">
              <div className="w-14 h-14 bg-[#10A37F] rounded-xl flex items-center justify-center shrink-0">
                <Icon name="Zap" size={26} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#1a1a2e] font-bold text-lg">Pro</span>
                  <span className="bg-[#10A37F] text-white text-xs font-semibold px-2 py-0.5 rounded-full">Активна</span>
                </div>
                <p className="text-[#374151] text-sm">Следующее списание — <span className="font-medium text-[#1a1a2e]">15 мая 2026</span></p>
              </div>
              <Button size="sm" variant="outline" className="border-[#10A37F] text-[#10A37F] hover:bg-white shrink-0">
                Продлить
              </Button>
            </div>
          </div>

          {/* Карточки планов */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="rounded-2xl border-2 p-5 flex flex-col transition-all"
                style={{ borderColor: plan.border, background: plan.bg }}
              >
                {/* Шапка */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-[#1a1a2e] text-base">{plan.name}</span>
                    {plan.active && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: plan.color, color: "#fff" }}>
                        Ваш план
                      </span>
                    )}
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="text-3xl font-extrabold" style={{ color: plan.color }}>{plan.price}</span>
                    <span className="text-[#6b7280] text-sm mb-1">{plan.period}</span>
                  </div>
                </div>

                {/* Список преимуществ */}
                <ul className="space-y-2 flex-1 mb-5">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#374151]">
                      <span className="mt-0.5 shrink-0" style={{ color: plan.color }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Кнопка */}
                {plan.active ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    style={{ borderColor: plan.color, color: plan.color }}
                  >
                    Текущий план
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="w-full text-white"
                    style={{ background: plan.color }}
                  >
                    {plan.id === "free" ? "Перейти" : "Подключить"}
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Управление */}
          <div className="mt-6 p-4 bg-[#f9fafb] rounded-xl border border-[#e5e7eb] flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-[#1a1a2e]">Управление платежами</div>
              <div className="text-xs text-[#6b7280] mt-0.5">История оплат, смена карты, отмена подписки</div>
            </div>
            <Button variant="ghost" size="sm" className="text-[#6b7280] hover:text-[#1a1a2e] gap-1.5">
              <Icon name="ChevronRight" size={16} />
              Открыть
            </Button>
          </div>
        </div>
      );
    }

    if (activeMenu !== "myProfile") {
      return (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#e8f5f0] rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name={settingsMenuItems.find(m => m.id === activeMenu)?.icon || "Settings"} size={28} className="text-[#10A37F]" />
            </div>
            <h3 className="text-[#1a1a2e] font-semibold text-lg mb-2">
              {settingsMenuItems.find(m => m.id === activeMenu)?.label}
            </h3>
            <p className="text-[#6b7280] text-sm">Раздел в разработке</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-10 max-w-2xl">

          {/* ПРОФИЛЬ */}
          <section>
            <h2 className="text-[#1a1a2e] font-bold text-lg mb-4 pb-2 border-b border-[#e5e7eb]">Мой профиль</h2>
            <div className="space-y-4">
              {[
                { label: "Логин", field: "login" as keyof typeof profile },
                { label: "Никнейм", field: "nickname" as keyof typeof profile },
                { label: "Имя", field: "firstName" as keyof typeof profile },
                { label: "Фамилия", field: "lastName" as keyof typeof profile },
              ].map((item) => (
                <div key={item.field}>
                  <label className="block text-sm font-medium text-[#374151] mb-1">{item.label}</label>
                  <input
                    type="text"
                    value={profile[item.field]}
                    onChange={(e) => setProfile({ ...profile, [item.field]: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#d1d5db] bg-white text-[#1a1a2e] text-sm focus:outline-none focus:ring-2 focus:ring-[#10A37F] focus:border-transparent"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">Дата рождения</label>
                <input
                  type="date"
                  value={profile.birthdate}
                  onChange={(e) => setProfile({ ...profile, birthdate: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#d1d5db] bg-white text-[#1a1a2e] text-sm focus:outline-none focus:ring-2 focus:ring-[#10A37F] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">Статус</label>
                <input
                  type="text"
                  value={profile.status}
                  onChange={(e) => setProfile({ ...profile, status: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#d1d5db] bg-white text-[#1a1a2e] text-sm focus:outline-none focus:ring-2 focus:ring-[#10A37F] focus:border-transparent"
                  placeholder="Ваш статус..."
                />
              </div>
              <Button className="bg-[#10A37F] hover:bg-[#0d8f6f] text-white px-6 py-2 rounded-lg text-sm font-medium">
                Сохранить изменения
              </Button>
            </div>
          </section>

          {/* УВЕДОМЛЕНИЯ */}
          <section>
            <h2 className="text-[#1a1a2e] font-bold text-lg mb-4 pb-2 border-b border-[#e5e7eb]">Уведомления</h2>
            <div className="space-y-3">
              {[
                { key: "messages" as keyof typeof notifications, label: "Личные сообщения", desc: "Уведомления при получении новых сообщений" },
                { key: "mentions" as keyof typeof notifications, label: "Упоминания", desc: "Уведомления при упоминании вашего имени" },
                { key: "sounds" as keyof typeof notifications, label: "Звуки", desc: "Звуковые уведомления" },
                { key: "desktop" as keyof typeof notifications, label: "Рабочий стол", desc: "Всплывающие уведомления на рабочем столе" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-[#f9fafb] rounded-xl border border-[#e5e7eb]">
                  <div>
                    <div className="text-[#1a1a2e] font-medium text-sm">{item.label}</div>
                    <div className="text-[#6b7280] text-xs mt-0.5">{item.desc}</div>
                  </div>
                  <Switch
                    checked={notifications[item.key]}
                    onCheckedChange={(v) => setNotifications({ ...notifications, [item.key]: v })}
                    className="data-[state=checked]:bg-[#10A37F]"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* ТЕМА */}
          <section>
            <h2 className="text-[#1a1a2e] font-bold text-lg mb-4 pb-2 border-b border-[#e5e7eb]">Выбор темы</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setTheme("light")}
                className={`p-4 rounded-xl border-2 transition-all ${theme === "light" ? "border-[#10A37F] bg-[#e8f5f0]" : "border-[#e5e7eb] bg-white hover:border-[#10A37F]/40"}`}
              >
                <div className="w-10 h-10 bg-[#f3f4f6] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="Sun" size={22} className="text-[#f59e0b]" />
                </div>
                <div className={`text-sm font-semibold ${theme === "light" ? "text-[#10A37F]" : "text-[#374151]"}`}>Светлая</div>
                <div className="text-xs text-[#6b7280] mt-1">Яркий и чистый интерфейс</div>
                {theme === "light" && <div className="mt-2 text-xs text-[#10A37F] font-medium">✓ Активна</div>}
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`p-4 rounded-xl border-2 transition-all ${theme === "dark" ? "border-[#10A37F] bg-[#e8f5f0]" : "border-[#e5e7eb] bg-white hover:border-[#10A37F]/40"}`}
              >
                <div className="w-10 h-10 bg-[#1a1a2e] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="Moon" size={22} className="text-[#818cf8]" />
                </div>
                <div className={`text-sm font-semibold ${theme === "dark" ? "text-[#10A37F]" : "text-[#374151]"}`}>Тёмная</div>
                <div className="text-xs text-[#6b7280] mt-1">Комфорт для глаз ночью</div>
                {theme === "dark" && <div className="mt-2 text-xs text-[#10A37F] font-medium">✓ Активна</div>}
              </button>
            </div>
          </section>

          {/* КАРТОЧКА ПРОФИЛЯ */}
          <section className="pb-8">
            <h2 className="text-[#1a1a2e] font-bold text-lg mb-4 pb-2 border-b border-[#e5e7eb]">Карточка профиля</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Редактор */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">Баннер профиля</label>
                    <div
                      onClick={() => setUploadModal("banner")}
                      className="h-20 rounded-xl flex items-center justify-center cursor-pointer hover:opacity-90 transition-all border-2 border-dashed border-[#10A37F]/40 overflow-hidden relative group"
                      style={bannerImage ? {} : { background: "linear-gradient(to right, #10A37F, #059669)" }}
                    >
                      {bannerImage ? (
                        <>
                          <img src={bannerImage} alt="banner" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-2 text-white text-sm font-medium">
                              <Icon name="Upload" size={16} />
                              Изменить
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center gap-2 text-white text-sm">
                          <Icon name="Image" size={18} />
                          <span>Загрузить баннер</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">Аватар</label>
                    <div className="flex items-center gap-3">
                      <div
                        onClick={() => setUploadModal("avatar")}
                        className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer relative overflow-hidden group"
                        style={{ background: avatarImage ? "transparent" : "linear-gradient(135deg, #10A37F, #059669)" }}
                      >
                        {avatarImage ? (
                          <img src={avatarImage} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-white text-xl font-bold">М</span>
                        )}
                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Icon name="Camera" size={18} className="text-white" />
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setUploadModal("avatar")}
                        className="border-[#10A37F] text-[#10A37F] hover:bg-[#e8f5f0]"
                      >
                        Изменить фото
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">Отображаемое имя</label>
                    <input
                      type="text"
                      defaultValue="Мария Иванова"
                      className="w-full px-3 py-2 rounded-lg border border-[#d1d5db] bg-white text-[#1a1a2e] text-sm focus:outline-none focus:ring-2 focus:ring-[#10A37F]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">Никнейм</label>
                    <input
                      type="text"
                      defaultValue="@МашаДизайн"
                      className="w-full px-3 py-2 rounded-lg border border-[#d1d5db] bg-white text-[#1a1a2e] text-sm focus:outline-none focus:ring-2 focus:ring-[#10A37F]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-3">Социальные сети</label>
                    <div className="space-y-2">
                      {[
                        { key: "github" as keyof typeof socials, label: "GitHub", placeholder: "github.com/username" },
                        { key: "twitter" as keyof typeof socials, label: "Twitter / X", placeholder: "@username" },
                        { key: "dribbble" as keyof typeof socials, label: "Dribbble", placeholder: "dribbble.com/username" },
                        { key: "behance" as keyof typeof socials, label: "Behance", placeholder: "behance.net/username" },
                      ].map((social) => (
                        <div key={social.key} className="flex items-center gap-2">
                          <Icon name="Link" size={14} className="text-[#10A37F] shrink-0" />
                          <input
                            type="text"
                            value={socials[social.key]}
                            onChange={(e) => setSocials({ ...socials, [social.key]: e.target.value })}
                            placeholder={social.placeholder}
                            className="flex-1 px-3 py-1.5 rounded-lg border border-[#d1d5db] bg-white text-[#1a1a2e] text-xs focus:outline-none focus:ring-2 focus:ring-[#10A37F]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Превью карточки */}
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-3">Предпросмотр</label>
                  <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden shadow-sm">
                    {/* Баннер */}
                    <div className="h-16 overflow-hidden" style={{ background: bannerImage ? "transparent" : "linear-gradient(to right, #10A37F, #059669)" }}>
                      {bannerImage && <img src={bannerImage} alt="banner" className="w-full h-full object-cover" />}
                    </div>
                    <div className="px-4 pb-4">
                      {/* Аватар */}
                      <div className="relative -mt-8 mb-3 w-fit">
                        <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden flex items-center justify-center" style={{ background: avatarImage ? "transparent" : "linear-gradient(135deg, #10A37F, #059669)" }}>
                          {avatarImage
                            ? <img src={avatarImage} alt="avatar" className="w-full h-full object-cover" />
                            : <span className="text-white font-bold text-lg">М</span>
                          }
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#10A37F] border-2 border-white rounded-full"></div>
                      </div>

                      {/* Имя и никнейм */}
                      <div className="mb-2">
                        <div className="text-[#1a1a2e] font-bold">Мария Иванова</div>
                        <div className="text-[#6b7280] text-xs">@МашаДизайн</div>
                      </div>

                      {/* Статус */}
                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="w-2 h-2 bg-[#10A37F] rounded-full"></div>
                        <span className="text-[#374151] text-xs">Работаю в Figma ✏️</span>
                      </div>

                      {/* Достижения */}
                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="bg-[#fef3c7] border border-[#f59e0b] rounded-full px-2 py-0.5 flex items-center gap-1">
                          <Icon name="Star" size={10} className="text-[#f59e0b]" />
                          <span className="text-[#92400e] text-xs font-medium">Поддержал проект</span>
                        </div>
                      </div>

                      {/* Соцсети */}
                      <div className="flex gap-2">
                        {["G", "T", "D"].map((s, i) => (
                          <div key={i} className="w-6 h-6 bg-[#f3f4f6] rounded-md flex items-center justify-center text-[#6b7280] text-xs font-bold cursor-pointer hover:bg-[#e8f5f0] hover:text-[#10A37F] transition-colors">
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
            </div>

            <div className="mt-5">
              <Button className="bg-[#10A37F] hover:bg-[#0d8f6f] text-white px-6 py-2 rounded-lg text-sm font-medium">
                Сохранить карточку
              </Button>
            </div>
          </section>

        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <UploadModal
        type={uploadModal}
        currentImage={uploadModal === "banner" ? bannerImage : avatarImage}
        onClose={() => setUploadModal(null)}
        onUpload={(url) => {
          if (uploadModal === "banner") setBannerImage(url);
          else setAvatarImage(url);
        }}
      />
      {/* Шапка настроек */}
      <div className="h-14 bg-white border-b border-[#e5e7eb] flex items-center px-6 gap-4 shrink-0">
        <div className="flex items-center gap-2">
          <Icon name="Settings" size={20} className="text-[#10A37F]" />
          <span className="text-[#1a1a2e] font-semibold text-base">Настройки</span>
        </div>
        <div className="ml-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-[#6b7280] hover:text-[#1a1a2e] hover:bg-[#f3f4f6]"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Левое меню настроек */}
        <div className="w-56 bg-[#f9fafb] border-r border-[#e5e7eb] flex-shrink-0 overflow-y-auto">
          <div className="p-3">
            <div className="text-[#9ca3af] text-xs font-semibold uppercase tracking-wide px-3 py-2">
              Настройки аккаунта
            </div>
            <div className="space-y-0.5">
              {settingsMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveMenu(item.id);
                    if (item.id === "myProfile") setActiveSection("profile");
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeMenu === item.id
                      ? "bg-[#10A37F] text-white font-medium"
                      : "text-[#374151] hover:bg-[#e5e7eb]"
                  }`}
                >
                  <Icon name={item.icon} size={16} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Содержимое */}
        {renderContent()}
      </div>
    </div>
  );
};

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a2e] overflow-x-hidden">
      {settingsOpen && <SettingsPage onClose={() => setSettingsOpen(false)} />}

      {/* Навигация */}
      <nav className="bg-white border-b border-[#e5e7eb] px-4 sm:px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#10A37F] rounded-full flex items-center justify-center">
              <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#1a1a2e]">Дискордик</h1>
              <p className="text-xs text-[#6b7280] hidden sm:block">Rich Presence для Figma в Discord</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <Button variant="ghost" className="text-[#6b7280] hover:text-[#1a1a2e] hover:bg-[#f3f4f6]">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button className="bg-[#10A37F] hover:bg-[#0d8f6f] text-white px-6 py-2 rounded text-sm font-medium">
              Скачать
            </Button>
          </div>
          <Button
            variant="ghost"
            className="sm:hidden text-[#6b7280] hover:text-[#1a1a2e] hover:bg-[#f3f4f6] p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="sm:hidden mt-4 pt-4 border-t border-[#e5e7eb]">
            <div className="flex flex-col gap-3">
              <Button variant="ghost" className="text-[#6b7280] hover:text-[#1a1a2e] justify-start">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
              <Button className="bg-[#10A37F] hover:bg-[#0d8f6f] text-white">
                Скачать
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Макет Discord */}
      <div className="flex min-h-screen">
        {/* Боковая панель серверов */}
        <div className="hidden lg:flex w-[72px] bg-[#e8e8e8] flex-col items-center py-3 gap-2 border-r border-[#d1d5db]">
          <div className="w-12 h-12 bg-[#10A37F] rounded-2xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer shadow-sm">
            <Monitor className="w-6 h-6 text-white" />
          </div>
          <div className="w-8 h-[2px] bg-[#d1d5db] rounded-full"></div>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-12 h-12 bg-white rounded-3xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer hover:bg-[#10A37F] hover:text-white text-[#6b7280] shadow-sm group"
            >
              <span className="text-sm font-medium group-hover:text-white">{i}</span>
            </div>
          ))}
        </div>

        {/* Основной контент */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Боковая панель каналов */}
          <div className={`${mobileSidebarOpen ? "block" : "hidden"} lg:block w-full lg:w-60 bg-[#efefef] flex flex-col border-r border-[#d1d5db]`}>
            <div className="p-4 border-b border-[#d1d5db] flex items-center justify-between">
              <h2 className="text-[#1a1a2e] font-semibold text-base">Сервер Дискордик</h2>
              <Button
                variant="ghost"
                className="lg:hidden text-[#6b7280] hover:text-[#1a1a2e] p-1"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1 p-2">
              <div className="mb-4">
                <div className="flex items-center gap-1 px-2 py-1 text-[#6b7280] text-xs font-semibold uppercase tracking-wide">
                  <ArrowRight className="w-3 h-3" />
                  <span>Текстовые каналы</span>
                </div>
                <div className="mt-1 space-y-0.5">
                  {["общий", "новости", "витрина", "помощь"].map((channel) => (
                    <div
                      key={channel}
                      className="flex items-center gap-1.5 px-2 py-1 rounded text-[#6b7280] hover:text-[#1a1a2e] hover:bg-[#d9d9d9] cursor-pointer"
                    >
                      <Hash className="w-4 h-4" />
                      <span className="text-sm">{channel}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 px-2 py-1 text-[#6b7280] text-xs font-semibold uppercase tracking-wide">
                  <ArrowRight className="w-3 h-3" />
                  <span>Голосовые каналы</span>
                </div>
                <div className="mt-1 space-y-0.5">
                  {["Общий", "Обзор дизайна"].map((channel) => (
                    <div
                      key={channel}
                      className="flex items-center gap-1.5 px-2 py-1 rounded text-[#6b7280] hover:text-[#1a1a2e] hover:bg-[#d9d9d9] cursor-pointer"
                    >
                      <Mic className="w-4 h-4" />
                      <span className="text-sm">{channel}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Область пользователя */}
            <div className="p-2 bg-[#e0e0e0] border-t border-[#d1d5db] flex items-center gap-2">
              <div className="w-8 h-8 bg-[#10A37F] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">А</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[#1a1a2e] text-sm font-medium truncate">Алексей</div>
                <div className="text-[#6b7280] text-xs truncate">#1234</div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-[#d1d5db]">
                  <Mic className="w-4 h-4 text-[#6b7280]" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0 hover:bg-[#d1d5db]"
                  onClick={() => setSettingsOpen(true)}
                >
                  <Settings className="w-4 h-4 text-[#6b7280]" />
                </Button>
              </div>
            </div>
          </div>

          {/* Область чата */}
          <div className="flex-1 flex flex-col">
            {/* Заголовок чата */}
            <div className="h-12 bg-white border-b border-[#e5e7eb] flex items-center px-4 gap-2 shadow-sm">
              <Button
                variant="ghost"
                className="lg:hidden text-[#6b7280] hover:text-[#1a1a2e] hover:bg-[#f3f4f6] p-1 mr-2"
                onClick={() => setMobileSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <Hash className="w-5 h-5 text-[#6b7280]" />
              <span className="text-[#1a1a2e] font-semibold">витрина</span>
              <div className="w-px h-6 bg-[#e5e7eb] mx-2 hidden sm:block"></div>
              <span className="text-[#6b7280] text-sm hidden sm:block">Показывай свою работу в Figma с Дискордик</span>
              <div className="ml-auto flex items-center gap-2 sm:gap-4">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#6b7280] cursor-pointer hover:text-[#1a1a2e]" />
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#6b7280] cursor-pointer hover:text-[#1a1a2e]" />
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#6b7280] cursor-pointer hover:text-[#1a1a2e]" />
              </div>
            </div>

            {/* Сообщения */}
            <div className="flex-1 p-2 sm:p-4 space-y-4 sm:space-y-6 overflow-y-auto bg-white">
              {/* Приветственное сообщение */}
              <div className="flex gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#10A37F] rounded-full flex items-center justify-center flex-shrink-0">
                  <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-[#1a1a2e] font-medium text-sm sm:text-base">Дискордик</span>
                    <span className="text-[#9ca3af] text-xs hidden sm:inline">Сегодня в 12:00</span>
                    <span className="bg-[#10A37F] text-white text-xs px-1.5 py-0.5 rounded font-medium">БОТ</span>
                  </div>
                  <div className="text-[#374151] mb-3 text-sm sm:text-base">
                    <p className="mb-3 sm:mb-4">
                      <strong>Добро пожаловать в Дискордик!</strong> Показывай свой прогресс в Figma прямо в Discord.
                    </p>
                    <div className="bg-[#f9fafb] border-l-4 border-[#10A37F] p-3 sm:p-4 rounded">
                      <h3 className="text-[#1a1a2e] font-semibold mb-2 text-sm sm:text-base">Что умеет Дискордик:</h3>
                      <ul className="space-y-1 text-xs sm:text-sm text-[#6b7280]">
                        <li>✓ Автоматически определяет Figma в браузере и приложении</li>
                        <li>✓ Показывает название текущего проекта/файла</li>
                        <li>✓ Обновляется каждые 5 секунд в реальном времени</li>
                        <li>✓ Очищает статус при простое</li>
                        <li>✓ Работает на всех платформах</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Сообщение с Rich Presence */}
              <div className="flex gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs sm:text-sm font-medium">М</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-[#1a1a2e] font-medium text-sm sm:text-base">Мария Дизайнер</span>
                    <span className="text-[#9ca3af] text-xs hidden sm:inline">Сегодня в 12:05</span>
                  </div>
                  <div className="text-[#374151] mb-3 text-sm sm:text-base">
                    Только начала работу над новым дизайном лендинга!
                  </div>

                  {/* Rich Presence карточка */}
                  <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden w-full max-w-sm shadow-sm">
                    <div className="h-16 sm:h-20 bg-gradient-to-r from-[#10A37F] to-[#059669] relative">
                      <div className="absolute -bottom-3 sm:-bottom-4 left-3 sm:left-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white bg-[#f9fafb] overflow-hidden shadow-sm relative">
                          <div className="w-full h-full bg-gradient-to-br from-[#10A37F] to-[#059669] flex items-center justify-center">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center">
                              <span className="text-lg sm:text-2xl text-[#10A37F] font-bold">M</span>
                            </div>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-[#10A37F] border-4 border-white rounded-full"></div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 sm:pt-6 px-3 sm:px-4 pb-3 sm:pb-4">
                      <div className="mb-3 sm:mb-4">
                        <h3 className="text-[#1a1a2e] text-lg sm:text-xl font-bold mb-1">Мария</h3>
                        <div className="flex items-center gap-2 text-[#6b7280] text-xs sm:text-sm">
                          <span>maria_design</span>
                          <span>·</span>
                          <div className="flex gap-1 ml-1">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#10A37F] rounded-sm"></div>
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#f59e0b] rounded-sm"></div>
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#6366f1] rounded-sm"></div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 sm:mb-4">
                        <div className="bg-[#f3f4f6] rounded-lg p-2 sm:p-3">
                          <div className="flex items-center gap-2 text-[#374151] text-xs sm:text-sm">
                            <div className="w-2 h-2 bg-[#10A37F] rounded-full animate-pulse"></div>
                            <span>Работаю над проектом...</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex border-b border-[#e5e7eb] mb-3 sm:mb-4">
                        <button className="px-3 sm:px-4 py-2 text-[#6b7280] text-xs sm:text-sm font-medium hover:text-[#1a1a2e]">
                          Обо мне
                        </button>
                        <button className="px-3 sm:px-4 py-2 text-[#10A37F] text-xs sm:text-sm font-medium border-b-2 border-[#10A37F]">
                          Активность
                        </button>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-[#6b7280] text-xs font-semibold uppercase tracking-wide mb-2 sm:mb-3">
                          <span>Работает</span>
                        </div>
                        <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#ff7262] to-[#f24e1e] rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.015-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[#1a1a2e] font-semibold text-xs sm:text-sm mb-1">Дискордик</div>
                            <div className="text-[#374151] text-xs sm:text-sm mb-1">Работаю над логотипом</div>
                            <div className="text-[#6b7280] text-xs sm:text-sm mb-2">Figma Desktop</div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-[#10A37F] rounded-full animate-pulse"></div>
                              <span className="text-[#10A37F] text-xs font-medium">0:37 прошло</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ещё одно сообщение */}
              <div className="flex gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs sm:text-sm font-medium">И</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-[#1a1a2e] font-medium text-sm sm:text-base">Иван UX</span>
                    <span className="text-[#9ca3af] text-xs hidden sm:inline">Сегодня в 12:08</span>
                  </div>
                  <div className="text-[#374151] text-sm sm:text-base">
                    Наконец-то мои коллеги видят что я работаю, а не просто сижу в Discord 😄
                  </div>
                </div>
              </div>

              {/* Фичи */}
              <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-xl p-3 sm:p-4">
                <div className="text-[#6b7280] text-xs font-semibold uppercase tracking-wide mb-3">Возможности</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {[
                    { icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Мгновенный запуск", desc: "Устанавливается за минуту" },
                    { icon: <Eye className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Умное определение", desc: "Автоматически находит Figma" },
                    { icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Реальное время", desc: "Синхронизация каждые 5 секунд" },
                    { icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Приватность", desc: "Никакого сбора данных" },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-[#e8f5f0] transition-colors"
                    >
                      <div className="text-[#10A37F] mt-0.5">{feature.icon}</div>
                      <div>
                        <div className="text-[#1a1a2e] font-medium text-xs sm:text-sm">{feature.title}</div>
                        <div className="text-[#6b7280] text-xs sm:text-sm">{feature.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Поле ввода */}
            <div className="p-2 sm:p-4 bg-white border-t border-[#e5e7eb]">
              <div className="bg-[#f3f4f6] rounded-lg px-3 sm:px-4 py-2 sm:py-3">
                <div className="text-[#9ca3af] text-xs sm:text-sm">Сообщение #витрина</div>
              </div>
            </div>
          </div>

          {/* Боковая панель участников */}
          <div className="hidden xl:block w-60 bg-[#f9fafb] border-l border-[#e5e7eb] p-4">
            <div className="mb-4">
              <h3 className="text-[#6b7280] text-xs font-semibold uppercase tracking-wide mb-2">В сети — 3</h3>
              <div className="space-y-2">
                {[
                  { name: "Мария Дизайнер", status: "Работает в Figma", avatar: "М", color: "from-purple-400 to-pink-400" },
                  { name: "Иван UX", status: "В сети", avatar: "И", color: "from-green-400 to-blue-400" },
                  { name: "Алексей", status: "Разрабатывает Дискордик", avatar: "А", color: "from-blue-400 to-purple-400" },
                ].map((user, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#e8f5f0] cursor-pointer transition-colors">
                    <div className={`w-8 h-8 bg-gradient-to-r ${user.color} rounded-full flex items-center justify-center relative`}>
                      <span className="text-white text-sm font-medium">{user.avatar}</span>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#10A37F] border-2 border-[#f9fafb] rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[#1a1a2e] text-sm font-medium truncate">{user.name}</div>
                      <div className="text-[#6b7280] text-xs truncate">{user.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;