path = r'C:\Users\acdur\Downloads\lexclatcode\src\App.tsx'
with open(path, encoding='utf-8') as f:
    content = f.read()
start = "      case 'DASHBOARD': return ("
end = "      case 'PRACTICE':"
i = content.index(start)
j = content.index(end)
new_dashboard = """      case 'DASHBOARD': return (
        <div className="pt-28 px-4 sm:px-6 max-w-4xl mx-auto pb-20">
          <h1 className="text-3xl font-serif font-semibold text-foreground mb-2">
            Welcome, {profile?.displayName?.split(' ')[0] || 'Aspirant'}
          </h1>
          <p className="text-muted-foreground mb-10">Pick up where you left off.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Learning Hub', desc: 'Structured CLAT modules', view: 'LEARN', icon: <BookOpen size={22} /> },
              { title: 'Study Material', desc: 'Guides and notes', view: 'WIKI', icon: <FileText size={22} /> },
              { title: 'Mock Tests', desc: 'Full exam simulations', view: 'MOCKS', icon: <Trophy size={22} /> },
              { title: 'Current Affairs', desc: 'Daily GK updates', view: 'DAILY', icon: <Newspaper size={22} /> },
            ].map((card) => (
              <button
                key={card.title}
                onClick={() => setView(card.view as View)}
                className="text-left p-6 bg-white border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group"
              >
                <div className="text-primary mb-3">{card.icon}</div>
                <h3 className="font-semibold text-foreground group-hover:text-primary">{card.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{card.desc}</p>
              </button>
            ))}
          </div>
          {streak > 0 && (
            <p className="mt-8 text-sm text-muted-foreground">
              Study streak: <span className="font-semibold text-accent">{streak} days</span>
            </p>
          )}
          {!profile?.isPremium && (
            <div className="mt-10 p-6 bg-primary rounded-xl text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold">Upgrade to Premium</h3>
                <p className="text-sm text-blue-100 mt-1">Unlimited mocks, AI tutor, and analytics.</p>
              </div>
              <button onClick={handleCheckout} className="bg-accent text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-red-700 shrink-0">
                Upgrade
              </button>
            </div>
          )}
        </div>
      );
"""
content = content[:i] + new_dashboard + content[j:]
with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print('done')
