/**
 * @file src\app\privacy\page.tsx
 * @description Privacy Policy Page
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 21/02/2025
 * @license MIT
 * @version 1.0.0
 */

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">
        מדיניות פרטיות של synctip.com
      </h1>
      <div className="space-y-4">
        <p>
          אנו ב-synctip.com מכבדים את פרטיותך ומחויבים לשמור על המידע האישי שלך.
          מדיניות פרטיות זו מסבירה איך אנחנו אוספים, משתמשים, שומרים ומגייסים את
          המידע שאתה מספק לנו.
        </p>

        <h2 className="text-2xl font-semibold">1. המידע שאנחנו אוספים</h2>
        <p>
          אנו אוספים מידע אישי כאשר אתה נרשם לשירותים שלנו, כגון שם מלא, כתובת
          דוא&quot;ל ומידע נוסף שייתכן שתספק במהלך השימוש באתר.
        </p>
        <h2 className="text-2xl font-semibold">2. שימוש במידע</h2>
        <p>המידע שלך משמש בעיקר לצורך:</p>
        <ul className="list-disc pl-6">
          <li>מתן שירותים מותאמים אישית.</li>
          <li>שליחת עדכונים ושירותי תמיכה.</li>
          <li>שיפור חוויית השימוש באתר.</li>
        </ul>

        <h2 className="text-2xl font-semibold">3. הגנה על המידע</h2>
        <p>
          אנחנו נוקטים באמצעים טכנולוגיים וארגוניים כדי להגן על המידע האישי שלך.
          המידע מאוחסן באופן מאובטח, אך אין לנו אפשרות להבטיח שליטה מלאה על
          אבטחת המידע.
        </p>

        <h2 className="text-2xl font-semibold">4. שיתוף המידע</h2>
        <p>
          אנחנו לא משתפים את המידע האישי שלך עם צדדים שלישיים, אלא אם כן נדרשים
          לכך על פי החוק או במקרים של שיתוף עם ספקי שירותים שסייעו לנו בפעילות
          האתר.
        </p>

        <h2 className="text-2xl font-semibold">5. זכויותיך</h2>
        <p>
          יש לך את הזכות לעיין, לתקן או למחוק את המידע האישי שלך. אם ברצונך לבצע
          פעולה כזו, פנה אלינו בכתובת support@synctip.com.
        </p>

        <h2 className="text-2xl font-semibold">6. שינויים במדיניות</h2>
        <p>
          אנו שומרים לעצמנו את הזכות לעדכן את מדיניות הפרטיות הזו מעת לעת. כל
          שינוי יפורסם באתר ואנחנו נעדכן את תאריך העדכון בעמוד זה.
        </p>

        <h2 className="text-2xl font-semibold">7. יצירת קשר</h2>
        <p>
          אם יש לך שאלות בנוגע למדיניות הפרטיות שלנו, אל תהסס לפנות אלינו
          בכתובת: support@synctip.com.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
