/**
 * @file src\app\terms.tsx
 * @description Main Terms and Conditions page
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 21/02/2025
 * @license MIT
 * @version 1.0.0
 */

const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">
        תנאי השימוש של synctip.com
      </h1>
      <div className="space-y-4">
        <p>
          ברוך הבא ל-synctip.com. השימוש באתר ובשירותים המסופקים בו כפוף לתנאים
          המפורטים להלן.
        </p>

        <h2 className="text-2xl font-semibold">1. קבלה של תנאים</h2>
        <p>
          בשימושך באתר ובשירותים שלנו, אתה מקבל את תנאי השימוש של synctip.com,
          כולל כל שינוי עתידי.
        </p>

        <h2 className="text-2xl font-semibold">2. זכויות יוצרים</h2>
        <p>
          כל התוכן, העיצובים, והחומרים באתר הם רכוש של synctip.com, ואין לעשות
          בהם שימוש ללא רשות מפורשת.
        </p>

        <h2 className="text-2xl font-semibold">3. פרטיות</h2>
        <p>
          אנו מתחייבים לשמור על פרטיותך ולהגן על המידע האישי שלך. לפרטים נוספים,
          עיין במדיניות הפרטיות שלנו.
        </p>

        <h2 className="text-2xl font-semibold">4. שינויים בתנאים</h2>
        <p>
          synctip.com שומרת לעצמה את הזכות לעדכן או לשנות את תנאי השימוש בכל עת.
          שינויים אלה ייכנסו לתוקף מיד לאחר פרסומם.
        </p>

        <h2 className="text-2xl font-semibold">5. יצירת קשר</h2>
        <p>
          אם יש לך שאלות או הערות בנוגע לתנאי השימוש, אל תהסס לפנות אלינו
          בכתובת: support@synctip.com
        </p>
      </div>
    </div>
  );
};

export default TermsPage;
